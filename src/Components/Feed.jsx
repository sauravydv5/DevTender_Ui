// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./userCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     // Fetch feed only if not already loaded
//     if (feed && feed.length > 0) return;

//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res.data));
//     } catch (err) {
//       console.error("Error fetching feed:", err.response?.status, err.message);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   // While loading
//   if (!feed) {
//     return (
//       <h1 className="flex items-center justify-center text-2xl">Loading...</h1>
//     );
//   }

//   if (feed.length === 0) {
//     return (
//       <h1 className="flex items-center justify-center my-10 text-2xl">
//         No More User Found
//       </h1>
//     );
//   }

//   // Render first user from feed
//   return (
//     <div className="flex justify-center my-10">
//       <UserCard user={feed[0]} />
//     </div>
//   );
// };

// export default Feed;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Error fetching feed:", err.response?.status, err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <h1 className="flex items-center justify-center text-2xl">Loading...</h1>
    );
  }

  if (feed.length === 0) {
    return (
      <h1 className="flex items-center justify-center my-10 text-2xl">
        No More User Found
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
