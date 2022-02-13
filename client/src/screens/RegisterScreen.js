import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import Success from "../components/Success";

export default function RegisterScreen() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const registerState = useSelector((state) => state.registerReducer);
  const { error, loading, success } = registerState;

  function register() {
    if (password !== confirmpass) {
      alert("Passwords not matched");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(registerUser(user));
    }
  }
  return (
    <div className="register">
      <div className="row justify-content-center mt-5 m-3">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {success && <Success success="User Registered Successfully" />}
          {error && <Error error="Email Already Registered" />}
          <h2 className="text-center m-2" style={{ fonstSize: "35px" }}>
            Register
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              required
              type="text"
              placeholder="conform password"
              className="form-control"
              value={confirmpass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
            <button onClick={() => register()} className="btn mt-3 mb-3">
              REGISTER
            </button>
            <br />
            <a
              style={{ color: "black" }}
              href="/login"
              className="text-decoration-none"
            >
              Click Here To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
