export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
  var cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    varient: varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    sumPrice: pizza.prices[0][varient] * quantity,
  };

  if (cartItem.quantity > 10) {
    alert("You cannot add more than 10 quantiteis ");
  } else {
    if (cartItem.quantity < 0) {
      dispatch({ type: "DELETE_TO_CART", payload: pizza });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }

  const cartItems = getState().cartReducer.cartItems;

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_TO_CART", payload: pizza });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
