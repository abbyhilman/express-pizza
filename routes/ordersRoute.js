const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51ImB2xIXd4s4R4lq39YkbZ8cclCV7jlQsjmHZLDMpuppvzjYKW9itjQxnuoJpZdGDugGXoOhqeHx3nwOGUpEVGwm00qq7yNE3b"
);
const order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "idr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.send("Payment Success");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await order.find({ userId: userid }).sort({ _id: -1 });

    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderId = req.body.orderId;

  try {
    const orders = await order.findOne({ _id: orderId });
    orders.isDelivered = true;
    await orders.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
