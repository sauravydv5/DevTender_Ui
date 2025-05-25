import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="text-xl btn btn-ghost">🪴DevTinder</a>
        </div>
        <div className="flex items-center gap-2 space-x-4">
          {user?.firstName ? (
            <div className="mx-6 dropdown dropdown-end">
              Welcome,{user.firstName}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
