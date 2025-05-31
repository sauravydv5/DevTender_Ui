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
  console.log(feed);
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
// import axios from "axios";
// // import React, { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";
// import { BASE_URL } from "../utils/constant";
// import React, { useEffect } from "react";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((store) => store.feed);
//   console.log(feed);
//   const getFeed = async () => {
//     if (feed) return;
//     try {
//       const feed = await axios.get(BASE_URL + "/user/feed", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(feed.data));
//       // console.log(feed);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getFeed();
//   });

//   if (!feed) return;

//   if (feed.length <= 0)
//     return (
//       <h1 className="flex justify-center text-3xl m-52">No more users!!!!</h1>
//     );
//   return (
//     feed && (
//       <div className="flex flex-col items-center gap-4 my-5">
//         {feed && feed.map((user) => <UserCard key={user._id} user={user} />)}
//         {/* <UserCard user={feed[0]} /> */}
//       </div>
//     )
//   );
// };

// export default Feed;
