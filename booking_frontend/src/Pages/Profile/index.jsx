import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import CustomGooglMaps from "../../components/GoogleMap";
import MUIChartsPractice from "../../components/MUIChartsPie";

const Profile = () => {
  const [value, setValue] = useState([1, 100]);
  const [hotelCountInCityData, setHotelCountInCityData] = useState([]);

  useEffect(() => {
    getCountByCity();
  }, []);

  const getCountByCity = async () => {
    let result = await axios(
      `http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag`
    );
    setHotelCountInCityData(result.data);
    console.log(result.data, "hotel count");
  };

  return (
    <div className="bookings_container">
      {/* <CustomGooglMaps /> */}
      <div>
        <h4>No of hotels in each city</h4>
        <MUIChartsPractice data={hotelCountInCityData} />
      </div>
    </div>
  );
};

export default Profile;
