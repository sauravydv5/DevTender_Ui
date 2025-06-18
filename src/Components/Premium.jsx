import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";

export default function App() {
  // Handle plan selection and call backend API
  const handlePlanSelect = async (type) => {
    try {
      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      // You can handle the payment initiation here
      console.log("Order created:", response.data);
      alert(`Payment initiated for ${type} plan.`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  // Membership plans data
  const plans = [
    {
      name: "Bronze",
      price: "₹399",
      features: [
        "Basic Profile Visibility",
        "Limited Swipes",
        "Standard Match Suggestions",
      ],
      color: "border-green-400",
      bg: "bg-gray-800",
    },
    {
      name: "Silver",
      price: "₹649",
      features: [
        "Priority Profile Visibility",
        "Unlimited Swipes",
        "Advanced Match Suggestions",
        "2 AI-Project Matches/Week",
      ],
      color: "border-blue-400",
      bg: "bg-gray-800",
    },
    {
      name: "Gold",
      price: "₹1049",
      features: [
        "Top Profile Placement",
        "Unlimited Swipes & Chats",
        "Exclusive Developer Events",
        "Unlimited AI-Project Matches",
        "Premium Support 24/7",
      ],
      color: "border-purple-600",
      bg: "bg-gray-800",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16 font-sans bg-gray-100 dark:bg-gray-900 md:px-20">
      <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-800 dark:text-white sm:text-5xl">
        Choose Your DevTinder Membership
      </h1>

      <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl shadow-xl p-8 border-4
              ${plan.color}
              ${
                plan.highlighted
                  ? "scale-105 border-4 ring-4 ring-indigo-300"
                  : ""
              }
              transition-all duration-300 transform hover:scale-105
              ${plan.bg}
              flex flex-col justify-between
              text-white
            `}
          >
            <div>
              <h2 className="mb-4 text-3xl font-bold text-center text-white">
                {plan.name}
              </h2>
              <p className="mt-4 text-4xl font-extrabold text-center text-indigo-400">
                {plan.price}
                <span className="text-base text-gray-400"> /mo</span>
              </p>
              <ul className="mt-8 space-y-4 text-lg text-gray-200">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 text-center">
              <button
                onClick={() => handlePlanSelect(plan.name)}
                className="w-full px-8 py-4 font-semibold text-white transition duration-300 ease-in-out bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Choose {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
