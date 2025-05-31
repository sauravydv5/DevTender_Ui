import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      dispatch(removeConnections()); // Clear previous
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data)); // Set new
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

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
            className="flex items-center w-1/2 p-4 m-4 mx-auto rounded-lg shadow bg-base-300"
          >
            <img
              src={photoUrl}
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full"
            />
            <div className="ml-6 text-left">
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
          </div>
        )
      )}
    </div>
  );
};

export default Connections;
