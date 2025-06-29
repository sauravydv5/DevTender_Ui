// import { Outlet, useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";
// import Footer from "./Footer";
// import axios from "axios";

// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";

// const Body = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <NavBar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// export default Body;

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // use custom axios instance

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/profile/view");
      dispatch(addUser(res.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
