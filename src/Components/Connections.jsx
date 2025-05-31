import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
    } catch (err) {
      //Handle Error
    }
  };

  useEffect(() => {
    fetchConnections();
  });
  return (
    <div className="flex justify-center my-10">
      <h1 className="text-2xl text-bold">Connections</h1>
    </div>
  );
};

export default Connections;
