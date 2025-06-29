// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const requests = useSelector((store) => store.requests);
//   const dispatch = useDispatch();

//   // Accept or reject request
//   const reviewRequest = async (status, _id) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/review/${status}/${_id}`,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//       fetchRequests();
//     } catch (err) {
//       console.error(`Failed to ${status} request:`, err);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/user/requests/received`, {
//         withCredentials: true,
//       });
//       dispatch(addRequests(res?.data?.data));
//     } catch (err) {
//       console.error("Failed to fetch requests:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests) return null;

//   if (requests.length === 0) {
//     return (
//       <h1 className="flex justify-center my-10 text-2xl text-green-500">
//         No Requests Found
//       </h1>
//     );
//   }

//   return (
//     <div className="my-10 text-center">
//       <h1 className="text-3xl font-bold text-blue-600">
//         Connection Requests ({requests.length})
//       </h1>
//       {requests.map((request) => {
//         const user = request.fromUserId;
//         if (!user) return null;

//         const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

//         return (
//           <div
//             key={_id}
//             className="flex items-center w-full max-w-2xl p-4 m-4 mx-auto rounded-lg shadow bg-base-300"
//           >
//             <img
//               src={photoUrl || "https://via.placeholder.com/150"}
//               alt={`${firstName} ${lastName}`}
//               className="object-cover w-16 h-16 rounded-full"
//             />
//             <div className="flex-grow ml-6 text-left">
//               <h2 className="text-2xl font-bold text-white">
//                 {firstName} {lastName}
//               </h2>
//               {age && gender && (
//                 <p className="text-sm text-gray-400">
//                   {age} • {gender}
//                 </p>
//               )}
//               {about && <p className="text-sm text-gray-300">{about}</p>}
//             </div>
//             <div className="flex flex-col justify-center gap-2 ml-4">
//               <button
//                 className="px-4 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
//                 onClick={() => reviewRequest("accepted", request._id)}
//               >
//                 Accept
//               </button>
//               <button
//                 className="px-4 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
//                 onClick={() => reviewRequest("rejected", request._id)}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
      fetchRequests();
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-2xl text-green-500">
        No Requests Found
      </h1>
    );
  }

  return (
    <div className="my-10 text-center">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">
        Connection Requests ({requests.length})
      </h1>
      {requests.map((request) => {
        const user = request.fromUserId;
        if (!user) return null;

        return (
          <div
            key={request._id}
            className="flex items-center w-full max-w-2xl p-4 mx-auto mb-4 rounded-lg shadow bg-base-300"
          >
            <img
              src={user.photoUrl || "https://via.placeholder.com/150"}
              alt={`${user.firstName} ${user.lastName}`}
              className="object-cover w-16 h-16 rounded-full"
            />
            <div className="flex-1 ml-6 text-left">
              <h2 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              {user.age && user.gender && (
                <p className="text-sm text-gray-400">
                  {user.age} • {user.gender}
                </p>
              )}
              {user.about && (
                <p className="mt-1 text-sm text-gray-300">{user.about}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="px-4 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="px-4 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
