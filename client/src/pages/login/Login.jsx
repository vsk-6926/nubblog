import React, { useContext, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login relative flex flex-col items-center justify-center">
      <span className="loginTitle text-9xl text-rose-400">Login</span>
      <form className="loginForm flex flex-col mt-5" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput text-gray-600"
          placeholder="Enter your username.."
          ref={userRef}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className="loginInput text-gray-600"
          placeholder="Enter your password.."
          ref={passRef}
        ></input>
        <button
          type="submit"
          className="
           ml-5 mt-5 p-3 w-40 justify-center text-center cursor-pointer bg-rose-400 border-none rounded-md text-gray-50"
           disabled={isFetching}
        >
          Login
        </button>
      </form>
      <button className="loginRegisterButton absolute top-5 right-9 p-3 w-32 justify-center text-center cursor-pointer bg-gray-600 border-none rounded-md text-gray-50">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;
