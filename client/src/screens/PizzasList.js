import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import TrashIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

export default function PizzasList() {
  const dispatch = useDispatch();

  const pizzasState = useSelector((state) => state.getAllPizzasReducers);

  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div className="table-responsive-md">
      <h2>Pizzas List</h2>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]} <br />
                    Medium : {pizza.prices[0]["medium"]} <br />
                    Large : {pizza.prices[0]["large"]}
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <Link>
                      <i
                        className="m-1"
                        onClick={() => {
                          dispatch(deletePizza(pizza._id));
                        }}
                      >
                        <TrashIcon color="secondary" />
                      </i>
                    </Link>
                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <i className="m-1">
                        <EditIcon color="primary" />
                      </i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
