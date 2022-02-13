import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import AddPizza from "./AddPizza";
import EditPizza from "./EditPizza";
import OrdersList from "./OrdersList";
import PizzasList from "./PizzasList";
import UsersList from "./UsersList";

export default function AdminScreen() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginReducer);
  const { currentUser } = userState;

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  });
  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
          <ul className="admin-function">
            <li>
              <Link
                style={{
                  color: "white",
                  padding: "20px",
                  textDecoration: "none",
                }}
                to={"/admin/userlist"}
              >
                Users List
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  padding: "20px",
                  textDecoration: "none",
                }}
                to={"/admin/pizzaslist"}
              >
                Pizzas List
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  padding: "20px",
                  textDecoration: "none",
                }}
                to={"/admin/addpizza"}
              >
                Add New Pizza
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  padding: "20px",
                  textDecoration: "none",
                }}
                to={"/admin/orderlist"}
              >
                Order List
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/admin/userlist" exact component={UsersList} />
            <Route path="/admin/orderlist" exact component={OrdersList} />
            <Route path="/admin/addpizza" exact component={AddPizza} />
            <Route path="/admin/pizzaslist" exact component={PizzasList} />
            <Route
              path="/admin/editpizza/:pizzaid"
              exact
              component={EditPizza}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
