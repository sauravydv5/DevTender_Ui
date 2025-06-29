// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections, removeConnections } from "../utils/connectionSlice";
// import { useNavigate } from "react-router-dom";

// const Connections = () => {
//   const connections = useSelector((store) => store.connection);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchConnections = async () => {
//     try {
//       dispatch(removeConnections());
//       const response = await axios.get(`${BASE_URL}/user/connections`, {
//         withCredentials: true,
//       });
//       dispatch(addConnections(response.data.data));
//     } catch (error) {
//       console.error("Error fetching connections:", error);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   const handleChat = (connectionId) => {
//     navigate(`/chat/${connectionId}`);
//   };

//   if (!connections) return null;

//   if (connections.length === 0) {
//     return (
//       <h1 className="flex justify-center my-10 text-2xl text-green-500">
//         No connections found
//       </h1>
//     );
//   }

//   return (
//     <div className="my-10 text-center">
//       <h1 className="text-3xl font-bold text-pink-400">
//         Connections ({connections.length})
//       </h1>
//       {connections.map(
//         ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
//           <div
//             key={_id}
//             className="flex flex-col items-center w-11/12 p-4 m-4 mx-auto rounded-lg shadow sm:flex-row sm:w-1/2 bg-base-300"
//           >
//             <img
//               src={photoUrl}
//               alt="Profile"
//               className="object-cover w-16 h-16 rounded-full"
//             />
//             <div className="flex-1 ml-6 text-left">
//               <h2 className="text-2xl font-bold">
//                 {firstName} {lastName}
//               </h2>
//               {age && gender && (
//                 <p className="text-gray-600">
//                   {age} • {gender}
//                 </p>
//               )}
//               <p className="text-gray-700">{about}</p>
//             </div>
//             <button
//               onClick={() => handleChat(_id)}
//               className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg sm:mt-0 sm:ml-4 hover:bg-blue-600"
//             >
//               Chat
//             </button>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Connections;

import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      dispatch(removeConnections());

      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleChat = (connectionId) => {
    navigate(`/chat/${connectionId}`);
  };

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-2xl text-green-500">
        No connections found
      </h1>
    );
  }

  return (
    <div className="my-10 text-center">
      <h1 className="text-3xl font-bold text-pink-400">
        Connections ({connections.length})
      </h1>
      {connections.map(
        ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
          <div
            key={_id}
            className="flex flex-col items-center w-11/12 p-4 m-4 mx-auto rounded-lg shadow sm:flex-row sm:w-1/2 bg-base-300"
          >
            <img
              src={photoUrl}
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full"
            />
            <div className="flex-1 ml-6 text-left">
              <h2 className="text-2xl font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-600">
                  {age} • {gender}
                </p>
              )}
              <p className="text-gray-700">{about}</p>
            </div>
            <button
              onClick={() => handleChat(_id)}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg sm:mt-0 sm:ml-4 hover:bg-blue-600"
            >
              Chat
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Connections;
