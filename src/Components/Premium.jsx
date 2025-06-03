import React from "react";

// Main App component (can be renamed to MembershipPlans as per original request)
export default function App() {
  // Define the membership plans with updated prices in INR and new color schemes
  const plans = [
    {
      name: "Bronze",
      price: "₹399", // Price in Indian Rupees
      features: [
        "Basic Profile Visibility",
        "Limited Swipes",
        "Standard Match Suggestions",
      ],
      color: "border-green-400", // Tailwind CSS class for border color
      bg: "bg-gray-800", // Changed background color to dark gray
    },
    {
      name: "Silver",
      price: "₹649", // Price in Indian Rupees
      features: [
        "Priority Profile Visibility",
        "Unlimited Swipes",
        "Advanced Match Suggestions",
        "2 AI-Project Matches/Week",
      ],
      color: "border-blue-400", // Tailwind CSS class for border color
      bg: "bg-gray-800", // Changed background color to dark gray
    },
    {
      name: "Gold",
      price: "₹1049", // Price in Indian Rupees
      features: [
        "Top Profile Placement",
        "Unlimited Swipes & Chats",
        "Exclusive Developer Events",
        "Unlimited AI-Project Matches",
        "Premium Support 24/7",
      ],
      color: "border-purple-600", // Tailwind CSS class for border color
      bg: "bg-gray-800", // Changed background color to dark gray
      highlighted: true, // Flag to indicate if this plan should be highlighted
    },
  ];

  return (
    // Main container for the membership plans page
    <div className="min-h-screen px-6 py-16 font-sans bg-gray-100 dark:bg-gray-900 md:px-20">
      {/* Page Title */}
      <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-800 dark:text-white sm:text-5xl">
        Choose Your DevTinder Membership
      </h1>

      {/* Grid container for the plan cards */}
      <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">
        {/* Map through each plan to render a card */}
        {plans.map((plan, i) => (
          <div
            key={i} // Unique key for list rendering
            className={`
              rounded-3xl shadow-xl p-8 border-4
              ${plan.color} // Dynamic border color based on plan
              ${
                plan.highlighted
                  ? "scale-105 border-4 ring-4 ring-indigo-300"
                  : ""
              } // Highlight effect for Gold plan
              transition-all duration-300 transform hover:scale-105 // Hover effect
              ${plan.bg} // Dynamic background color based on plan
              flex flex-col justify-between // Flexbox for content distribution
              text-white // Ensure text is visible on dark background
            `}
          >
            <div>
              {/* Plan Name */}
              <h2 className="mb-4 text-3xl font-bold text-center text-white">
                {plan.name}
              </h2>
              {/* Plan Price */}
              <p className="mt-4 text-4xl font-extrabold text-center text-indigo-400">
                {plan.price}
                <span className="text-base text-gray-400"> /mo</span>
              </p>
              {/* Plan Features List */}
              <ul className="mt-8 space-y-4 text-lg text-gray-200">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-3">
                    {/* Checkmark icon */}
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
            {/* Choose Plan Button */}
            <div className="mt-10 text-center">
              <button className="w-full px-8 py-4 font-semibold text-white transition duration-300 ease-in-out bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Choose {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
