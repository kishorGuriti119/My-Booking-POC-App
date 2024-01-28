import React from "react";
import "./style.css";
import CustomGooglMaps from "../../components/GoogleMap";

const Profile = () => {
  console.log("profile");
  return (
    <div className="bookings_container">
      <CustomGooglMaps />
      <p>para</p>
    </div>
  );
};

export default Profile;
