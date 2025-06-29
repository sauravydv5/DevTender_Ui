// import React from "react";
// import EditProfile from "./EditProfile";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const user = useSelector((store) => store.user);

//   return (
//     <div>
//       <EditProfile user={user} />
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="px-4 py-6 md:px-8">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
