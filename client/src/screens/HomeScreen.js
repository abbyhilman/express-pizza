import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import { Loading } from "../components/Loading";
import Pizza from "../components/Pizza";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const pizzasState = useSelector((state) => state.getAllPizzasReducers);

  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <div>
      <Filter />
      <div className="row justify-content-center m-3">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          pizzas.map((item) => {
            return (
              <div className="col-md-3 m-3">
                <div key={item.id}>
                  <Pizza pizza={item} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
