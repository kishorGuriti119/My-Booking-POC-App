import React, { useEffect, useState } from "react";
import "./style.css";
import CustomGooglMaps from "../../components/GoogleMap";
import PriceRange from "../../components/PriceRange";

const Profile = () => {
  const [value, setValue] = useState([1, 100]);

  return (
    <div className="bookings_container">
      <CustomGooglMaps />
    </div>
  );
};

export default Profile;
