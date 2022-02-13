import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "./Error";
import { Loading } from "./Loading";
import Success from "./Success";

export default function Checkout({ subtotal }) {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  function tokenHandler(token) {
    dispatch(placeOrder(token, subtotal));
  }
  return (
    <div>
      <StripeCheckout
        name="BYEL PIZZA"
        amount={Number(subtotal)}
        shippingAddress
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        token={tokenHandler}
        stripeKey="pk_test_51ImB2xIXd4s4R4lqgXjelVZWvykt7q15KUrlfTLrnr3xpEBLXF2kj1okwQoyaSYtqji9gkfuT4VXlWCng033sTBE00M6ZH6YFo"
        currency="IDR"
      >
        {loading && <Loading />}
        {success && <Success success="Your Order Placed Successfully" />}
        {error && <Error error="Something went wrong" />}
        <button className="btn">CHECK OUT</button>
      </StripeCheckout>
    </div>
  );
}
