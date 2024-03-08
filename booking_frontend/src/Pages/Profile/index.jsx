import React, { useEffect, useState } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import StepperComponent from "../../components/StepperComponent";
import axios from "axios";
import CustomGooglMaps from "../../components/GoogleMap";
import MUIChartsPractice from "../../components/MUIChartsPie";
import MUILineChart from "../../components/MUILineChart";
import GoogleMap from "../../components/GoogleMap";
import User_Profile from "../../Pages/User_Profile";
import Upload_Profile_Image from "../../Pages/Upload_Profile_Image";

const Profile = () => {
  // const [value, setValue] = useState([1, 100]);
  // const [hotelCountInCityData, setHotelCountInCityData] = useState([]);
  // const [propertyCountInCity, setPropertyCountInCity] = useState([]);

  // useEffect(() => {
  //   getCountByCity();
  //   getPropertyCountInCity();
  // }, []);

  // const getCountByCity = async () => {
  //   let result = await axios(
  //     `http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag`
  //   );
  //   setHotelCountInCityData(result.data);
  //   console.log(result.data, "hotel count");
  // };

  // const getPropertyCountInCity = async () => {
  //   let result = await axios(
  //     `http://localhost:3001/hotels/countbytypeandcity?city=hydrabad`
  //   );
  //   setPropertyCountInCity(result.data);
  //   console.log(result.data, "property count");
  // };
  const steps = ["userInfo", "Upload Profile Image"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  return (
    <>
      <StepperComponent
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
      />
      {activeStep === 0 && (
        <User_Profile
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      )}
      {activeStep === 1 && (
        <Upload_Profile_Image
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      )}

      {activeStep === 2 && (
        <Upload_Profile_Image
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      )}
    </>
  );
};

export default Profile;
