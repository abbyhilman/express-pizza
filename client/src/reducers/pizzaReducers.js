export const getAllPizzasReducers = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PIZZAS_SUCCESS":
      return {
        loading: false,
        pizzas: action.payload,
      };
    case "GET_PIZZAS_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getPizzaByIdReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_PIZZA_ID_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PIZZA_ID_SUCCESS":
      return {
        loading: false,
        pizza: action.payload,
      };
    case "GET_PIZZA_ID_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const AddPizzaReducers = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_PIZZA_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const editPizzaReducers = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PIZZA_REQUEST":
      return {
        editloading: true,
        ...state,
      };
    case "EDIT_PIZZA_SUCCESS":
      return {
        editloading: false,
        editsuccess: true,
      };
    case "EDIT_PIZZA_ERROR":
      return {
        editloading: false,
        editerror: action.payload,
      };

    default:
      return state;
  }
};
