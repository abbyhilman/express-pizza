import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import { Loading } from "../components/Loading";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state.loginReducer);
  const { loading, error } = loginState;

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  }
  return (
    <div className="login">
      <div className="row justify-content-center mt-5 m-3">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {error && <Error error="Invalid Credentials" />}
          <h2 className="text-center m-2" style={{ fonstSize: "35px" }}>
            Login
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button onClick={() => login()} className="btn mt-3 mb-3">
              LOGIN
            </button>
            <br />
            <a
              style={{ color: "black" }}
              href="/regis"
              className="text-decoration-none"
            >
              Click Here To Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
