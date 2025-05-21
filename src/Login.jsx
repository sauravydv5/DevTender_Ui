import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("saurav@gmail.com");
  const [password, setPassword] = useState("SAurav@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
    } catch (err) {
      console.error(err);
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
