import React, { useEffect, useState } from "react";
import "./style.css";
import CustomGooglMaps from "../../components/GoogleMap";
import PriceRange from "../../components/PriceRange";

const Profile = () => {
  const [value, setValue] = useState([1, 100]);

  function valuetext(value) {
    return 500;
  }

  useEffect(() => {
    console.log(value, "");
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bookings_container">
      <CustomGooglMaps />
      <PriceRange
        handleChange={handleChange}
        value={value}
        valuetext={valuetext}
      />
    </div>
  );
};

export default Profile;
