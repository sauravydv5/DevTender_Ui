// import React, { useState } from "react";
// import axios from "axios"; // ✅ axios imported
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { removeFromFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   if (!user) {
//     return <div>No user data available</div>;
//   }

//   const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
//     user;

//   const handleSendRequest = async (status, userId) => {
//     try {
//       setLoading(true);
//       await axios.post(
//         `${BASE_URL}/request/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeFromFeed(userId));
//     } catch (err) {
//       console.error("Request failed:", err);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fallbackPhoto = "https://via.placeholder.com/150";

//   return (
//     <div>
//       <div className="shadow-sm card bg-base-300 w-96">
//         <figure>
//           <img
//             src={photoUrl || fallbackPhoto}
//             alt={`${firstName || "User"} ${lastName || ""}'s profile picture`}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = fallbackPhoto;
//             }}
//           />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{`${firstName || ""} ${
//             lastName || ""
//           }`}</h2>
//           {age && gender && <p>{`${age} ${gender}`}</p>}
//           <p>{about}</p>

//           {Array.isArray(skills) && skills.length > 0 && (
//             <div>
//               <h3 className="mt-4 font-semibold">Skills:</h3>
//               <ul className="list-disc list-inside">
//                 {skills.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="justify-center my-4 card-actions">
//             <button
//               className="bg-blue-800 btn"
//               onClick={() => handleSendRequest("ignored", _id)}
//               disabled={loading}
//             >
//               Ignore
//             </button>
//             <button
//               className="bg-pink-400 btn"
//               onClick={() => handleSendRequest("interested", _id)}
//               disabled={loading}
//             >
//               Interested
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import React, { useState } from "react";
import axios from "axios";
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
    <div className="max-w-xs overflow-hidden rounded-lg shadow-md bg-base-300">
      <figure>
        <img
          src={photoUrl || fallbackPhoto}
          alt={`${firstName || "User"} ${lastName || ""}'s profile picture`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackPhoto;
          }}
          className="object-cover w-full h-60"
        />
      </figure>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold text-white">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="mb-1 text-sm text-gray-400">
            {age} • {gender}
          </p>
        )}
        {about && <p className="mb-2 text-sm text-gray-300">{about}</p>}

        {Array.isArray(skills) && skills.length > 0 && (
          <div className="mt-2">
            <h3 className="font-medium text-gray-400">Skills:</h3>
            <ul className="text-sm text-gray-300 list-disc list-inside">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={loading}
            className="px-4 py-1 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 disabled:opacity-60"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            disabled={loading}
            className="px-4 py-1 text-sm font-semibold text-white bg-pink-500 rounded hover:bg-pink-600 disabled:opacity-60"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
