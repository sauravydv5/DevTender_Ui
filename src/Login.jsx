import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center my-10">
      <div className="shadow-sm card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="justify-center card-title">Login</h2>
          <div>
            <label className="py-4 fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text" className="input" placeholder="" />
            </label>
            <label className="py-4 fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" placeholder="" />
            </label>
          </div>
          <div className="justify-center card-actions">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
