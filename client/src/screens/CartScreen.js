import React from "react";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart } from "../actions/cartActions";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import TrashIcon from "@material-ui/icons/Delete";
import Checkout from "../components/Checkout";

export default function CartScreen() {
  AOS.init();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  var subTotal = cartItems.reduce((x, item) => x + item.sumPrice, 0);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <div>
      <div className="row justify-content-center p-3" data-aos="fade-down">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>
          <hr />
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-start m-1 w-100">
                  <h1>
                    {item.name} {[item.varient]}
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.sumPrice}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity: </h1>
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() =>
                      dispatch(
                        addToCart(item, item.quantity + 1, [item.varient])
                      )
                    }
                  >
                    <PlusIcon className="plusIcon" />
                  </button>
                  <b>{item.quantity}</b>
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() =>
                      dispatch(
                        addToCart(item, item.quantity - 1, [item.varient])
                      )
                    }
                  >
                    <MinusIcon className="minusIcon" />
                  </button>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "80px", width: "80px" }}
                  />
                </div>
                <div
                  className="m-1 w-100"
                  onClick={() => dispatch(deleteCart(item))}
                >
                  <TrashIcon className="trashIcon mt-4" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4 text-end">
          <h2 style={{ fontSize: "45px" }}>
            SubTotal : {formatRupiah(subTotal)}{" "}
          </h2>
          <Checkout subtotal={subTotal} />
        </div>
      </div>
    </div>
  );
}
