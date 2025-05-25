import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Error fetching feed:", err.response?.status, err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {feed ? (
        <pre>{JSON.stringify(feed, null, 2)}</pre>
      ) : (
        <p>Loading feed...</p>
      )}
    </div>
  );
};

export default Feed;
