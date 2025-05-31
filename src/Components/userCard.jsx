import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  console.log(user);

  const Photo = { photoUrl };

  return (
    <div>
      <div className="shadow-sm card bg-base-300 w-96">
        <figure>
          <img
            src={photoUrl}
            alt={`${firstName || ""} ${lastName || ""}'s profile picture`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Photo;
            }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName || ""} ${
            lastName || ""
          }`}</h2>
          {age && gender && <p>{`${age} ${gender}`}</p>}
          <p>{about}</p>
          <div className="justify-center my-4 card-actions">
            <button className="bg-blue-800 btn">Ignore</button>
            <button className="bg-pink-400 btn">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
