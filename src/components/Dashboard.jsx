import React from "react";

const Dashboard = (props) => {
  const handleLogout = () => {
    props.handleLogout();
  };

  return (
    <div>
      <h2>Welcome {props.data.userName}</h2>
      <div className="user-details">
        <img src={props.data.userPicture} referrerPolicy="no-referrer" className="profile-pic"/>
        <p className="text text-normal">{props.data.userName}</p>
        <p className="text text-normal">{props.data.userEmail}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
