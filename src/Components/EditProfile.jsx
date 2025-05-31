import React, { useEffect, useState } from "react";
import UserCard from "./userCard";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const EditProfile = ({ user }) => {
  console.log(user);
  const [firstName, setFirstname] = useState(user?.firstName);
  console.log(firstName);
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoURL] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoURL(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    setShowToast(false);

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Server response after save:", res);
      console.log("Data to be dispatched to Redux:", res?.data?.data);

      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setError(
          "Profile saved, but updated data not received from server. Please refresh."
        );
      }
    } catch (error) {
      console.error("Error saving profile:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            error.response.data ||
            "An error occurred on the server."
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        setError("An unexpected error occurred while saving profile.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 max">
        <div className="flex justify-center mx-10">
          <div className="shadow-xl card bg-base-300 w-96">
            <div className="card-body">
              <h2 className="justify-center card-title">Edit Profile</h2>
              <div>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="w-full dropdown">
                    <label
                      tabIndex={0}
                      className="justify-start w-full text-left btn"
                    >
                      {gender
                        ? gender.charAt(0).toUpperCase() + gender.slice(1)
                        : "Select gender"}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full z-[10]"
                    >
                      <li>
                        <button type="button" onClick={() => setGender("male")}>
                          Male
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setGender("female")}
                        >
                          Female
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setGender("others")}
                        >
                          Others
                        </button>
                      </li>
                    </ul>
                  </div>
                </label>

                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  ></textarea>
                </label>
              </div>
              {error && (
                <p className="mt-2 text-center text-red-500">{error}</p>
              )}
              <div className="justify-center mt-2 card-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, about, age, gender, skills }}
        />
      </div>
      {showToast && (
        <div className="pt-20 toast toast-top toast-center ">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
