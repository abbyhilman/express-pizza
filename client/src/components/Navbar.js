import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "@material-ui/icons/ShoppingCart";
import DropIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginReducer);
  const { currentUser } = userState;
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            BYEL PIZZA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon mt-2">
              <DropIcon />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {currentUser ? (
                <div class="dropdown">
                  <a
                    className="dropdown-toggle nav-link"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/order">
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => dispatch(logoutUser())}
                      >
                        <li>Logout</li>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/login">
                    Login
                  </a>
                </li>
              )}

              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  <Badge
                    badgeContent={cartState.cartItems.length}
                    color="primary"
                  >
                    <CartIcon />
                  </Badge>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
