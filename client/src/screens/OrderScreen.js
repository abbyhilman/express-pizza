import AOS from "aos";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import Success from "../components/Success";
import { getAllOrders } from "../actions/orderActions";

export default function OrderScreen() {
  AOS.init({
    duration: 2800,
  });
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getAllOrdersReducers);
  const { error, loading, orders } = orderState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <div>
      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <hr />
      <div className="row justify-content-center m-3 ">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((item) => {
            return (
              <div
                className="col-md-8 shadow-lg p-3 mb-5 bg-body rounded m-2 p-1"
                data-aos="fade-down"
              >
                <div className="d-flex">
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Items</h2>
                    <br />
                    {item.orderItems.map((k) => {
                      console.log(k);
                      return (
                        <div>
                          <p>
                            {k.name} [{k.varient}] * {k.quantity} ={" "}
                            {formatRupiah(k.sumPrice)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Address</h2>
                    <br />
                    <p>Street: {item.shippingAddress.street}</p>
                    <p>City: {item.shippingAddress.city}</p>
                    <p>Country: {item.shippingAddress.country}</p>
                    <p>Pincode: {item.shippingAddress.pincode}</p>
                  </div>
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Order Info</h2>
                    <br />
                    <p>Order Amount: {item.orderAmount}</p>
                    <p>Date: {item.createdAt.substring(0, 10)}</p>
                    <p>Transaction Id: {item.transactionId}</p>
                    <p>Order Id: {item._id}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
