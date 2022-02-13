import axios from "axios";
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  const currentUser = getState().loginReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    const res = await axios.post("/api/orders/placeorder", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_ERROR" });
    console.log(error);
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  dispatch({ type: "GET_ORDER_REQUEST" });
  try {
    const res = await axios.post("/api/orders/getuserorders", {
      userid: currentUser._id,
    });
    dispatch({ type: "GET_ORDER_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_ORDER_ERROR", payload: error });
  }
};

export const getAllUsersOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  dispatch({ type: "GET_ALL_ORDER_REQUEST" });
  try {
    const res = await axios.get("/api/orders/getallorders", {
      userid: currentUser._id,
    });
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_ERROR", payload: error });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/orders/deliverorder", { orderId });
    console.log(res);
    alert("Order Delivered");
    const orders = await axios.get("/api/orders/getallorders");
    dispatch({ type: "GET_ALLOWED_SUCCESS", payload: orders.data });
  } catch (error) {
    alert(error);
  }
};
