import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("saurav@gmail.com");
  const [password, setPassword] = useState("SAurav@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="shadow-sm card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="justify-center card-title">Login</h2>
          <div>
            <label className="my-2 fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={email}
                className="input"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="my-2 fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="justify-center m-2 card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
