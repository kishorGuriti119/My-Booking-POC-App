import React from "react";
import "./style.css";
import CustomGooglMaps from "../../components/GoogleMap";

const Profile = () => {
  console.log("profile");
  return (
    <div className="bookings_container">
      <CustomGooglMaps />
    </div>
  );
};

export default Profile;
