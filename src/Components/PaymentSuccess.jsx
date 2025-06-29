import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-100 to-green-200">
      <div className="max-w-lg p-10 text-center bg-white shadow-2xl rounded-3xl">
        <div className="flex items-center justify-center mb-6">
          <span className="text-6xl">🎉</span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-green-700">
          Congratulations!
        </h1>
        <p className="mb-2 text-lg text-gray-700">
          You are now a{" "}
          <span className="font-semibold text-green-600">Premium Member</span>.
        </p>
        <p className="mb-8 text-gray-500">
          Enjoy your exclusive features & community perks!
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 font-semibold text-white transition bg-green-600 shadow-md rounded-xl hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
