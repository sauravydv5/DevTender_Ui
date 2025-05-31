import React, { useState } from "react";
import axios from "axios"; // ✅ axios imported
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  if (!user) {
    return <div>No user data available</div>;
  }

  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(userId));
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fallbackPhoto = "https://via.placeholder.com/150";

  return (
    <div>
      <div className="shadow-sm card bg-base-300 w-96">
        <figure>
          <img
            src={photoUrl || fallbackPhoto}
            alt={`${firstName || "User"} ${lastName || ""}'s profile picture`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackPhoto;
            }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName || ""} ${
            lastName || ""
          }`}</h2>
          {age && gender && <p>{`${age} ${gender}`}</p>}
          <p>{about}</p>

          {Array.isArray(skills) && skills.length > 0 && (
            <div>
              <h3 className="mt-4 font-semibold">Skills:</h3>
              <ul className="list-disc list-inside">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="justify-center my-4 card-actions">
            <button
              className="bg-blue-800 btn"
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={loading}
            >
              Ignore
            </button>
            <button
              className="bg-pink-400 btn"
              onClick={() => handleSendRequest("interested", _id)}
              disabled={loading}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
