import axios from "axios";
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get("/api/pizzas/getallpizzas");
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_ERROR", payload: error });
  }
};

export const getPizzasById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZA_ID_REQUEST" });
  try {
    const res = await axios.post("/api/pizzas/getpizzabyid", { pizzaid });
    dispatch({ type: "GET_PIZZA_ID_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZA_ID_ERROR", payload: error });
  }
};

export const filterPizzas = (search, category) => async (dispatch) => {
  var filteredPizzas;
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get("/api/pizzas/getallpizzas");
    filteredPizzas = res.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(search)
    );
    if (category !== "all") {
      filteredPizzas = res.data.filter(
        (pizza) => pizza.category.toLowerCase() === category
      );
    }
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_ERROR", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });

  try {
    const res = await axios.post("/api/pizzas/addpizza", { pizza });
    console.log(res);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_ERROR", payload: error });
  }
};

export const editPizza = (editedpizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });

  try {
    const res = await axios.post("/api/pizzas/editpizza", { editedpizza });
    window.location.href = "/admin/pizzaslist";
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_ERROR", payload: error });
  }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    const res = await axios.post("/api/pizzas/deletepizza", { pizzaid });
    alert("Pizza Deleted Successfully");
    window.location.reload();
  } catch (error) {
    // dispatch({ type: "EDIT_PIZZA_ERROR", payload: error });
    alert(error);
    console.log(error);
  }
};
