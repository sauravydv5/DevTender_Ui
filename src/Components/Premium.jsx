import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/constant";

const RAZORPAY_KEY_ID = "rzp_test_tNCWdVrA2X7cT9";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function PaymentPage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const navigate = useNavigate();

  const handlePlanSelect = async (type) => {
    setLoadingPlan(type);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay");
        return;
      }

      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      const order = response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DevTinder",
        description: `${type} Membership`,
        order_id: order.orderId,
        handler: async (res) => {
          try {
            const verifyRes = await axios.post(
              BASE_URL + "/payment/verify",
              {
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_order_id: res.razorpay_order_id,
                razorpay_signature: res.razorpay_signature,
              },
              { withCredentials: true }
            );
            if (verifyRes.data.success) {
              toast.success("✅ Payment successful!");
              navigate("/payment-success");
            } else {
              toast.error("⚠️ Payment verification failed!");
            }
          } catch (err) {
            console.error("Verify error:", err);
            toast.error("Verification failed. Contact support.");
          }
        },
        prefill: { name: "User", email: "user@example.com" },
        theme: { color: "#6366F1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Bronze",
      price: "₹399",
      features: [
        "Basic Profile Visibility",
        "Limited Swipes",
        "Standard Match Suggestions",
      ],
      badge: "🥉",
      color: "border-green-400",
      bg: "bg-gradient-to-br from-gray-700 to-gray-900",
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
      badge: "🥈",
      color: "border-blue-400",
      bg: "bg-gradient-to-br from-gray-700 to-gray-900",
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
      badge: "🥇 Popular",
      color: "border-yellow-500",
      bg: "bg-gradient-to-br from-yellow-700 to-yellow-900",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16 font-sans bg-gray-100 dark:bg-gray-900 md:px-20">
      <ToastContainer />
      <h1 className="mb-6 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse">
        Upgrade to Premium 🚀
      </h1>
      <p className="max-w-xl mx-auto mb-12 text-center text-gray-500 dark:text-gray-300">
        Unlock exclusive features, get better matches, and stand out from the
        crowd with DevTinder Premium.
      </p>

      <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-3xl shadow-xl p-8 border-4 ${
              plan.color
            } ${
              plan.highlighted
                ? "scale-105 animate-bounce ring-4 ring-yellow-300"
                : ""
            } transition-transform duration-300 hover:scale-105 ${
              plan.bg
            } flex flex-col justify-between text-white`}
          >
            <div>
              <div className="absolute text-xl top-4 right-4">{plan.badge}</div>
              <h2 className="mb-4 text-3xl font-bold text-center">
                {plan.name}
              </h2>
              <p className="mt-4 text-4xl font-extrabold text-center text-yellow-300">
                {plan.price}
                <span className="text-base text-gray-300"> /mo</span>
              </p>
              <ul className="mt-8 space-y-4 text-lg text-gray-200">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 text-center">
              <button
                disabled={loadingPlan === plan.name}
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full px-8 py-4 font-semibold text-white bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  loadingPlan === plan.name ? "cursor-wait opacity-80" : ""
                }`}
              >
                {loadingPlan === plan.name
                  ? "Processing..."
                  : `Choose ${plan.name}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
