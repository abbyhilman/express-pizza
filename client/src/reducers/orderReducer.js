export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return {
        loading: true,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "PLACE_ORDER_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_ORDER_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_ORDER_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
      };
    case "GET_ORDER_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getAllUsersOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_ORDER_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_ALL_ORDER_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
      };
    case "GET_ALL_ORDER_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
