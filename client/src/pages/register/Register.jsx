import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    }
    catch(err){
      setError(true);
    }
  };

  return (
    <div className="register relative flex flex-col items-center justify-center">
      <span className="registerTitle text-9xl text-rose-400">Register</span>
      <form className="registerForm flex flex-col mt-5" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput text-gray-600"
          placeholder="Enter your username.."
          onChange={e => setUsername(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          type="text"
          className="registerInput text-gray-600"
          placeholder="Enter your email.."
          onChange={e => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className="registerInput text-gray-600"
          placeholder="Enter your password.."
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button
          className="registerButton ml-5 mt-5 p-3 w-40 justify-center text-center cursor-pointer bg-rose-400 border-none rounded-md text-gray-50"
          type="submit"
        >
          Register
        </button>
      </form>
      <button className="registerLoginButton absolute top-5 right-9 p-3 w-32 justify-center text-center cursor-pointer bg-gray-600 border-none rounded-md text-gray-50">
        <Link to="/login">Login</Link>
      </button>
      {error && <span className="text-red-700 mt-3">Something Went Wrong!!</span>}
    </div>
  );
};

export default Register;
