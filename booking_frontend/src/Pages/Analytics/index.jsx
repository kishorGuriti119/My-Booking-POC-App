import React, { useEffect, useState } from "react";
import "./style.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import CustomGooglMaps from "../../components/GoogleMap";
import MUIChartsPractice from "../../components/MUIChartsPie";
import MUILineChart from "../../components/MUILineChart";

const Analytics = () => {
  const [value, setValue] = useState([1, 100]);
  const [hotelCountInCityData, setHotelCountInCityData] = useState([]);
  const [propertyCountInCity, setPropertyCountInCity] = useState([]);
  const [lineGraphSlectedCity, setLineGraphSelectedCity] = useState("hydrabad");

  useEffect(() => {
    getCountByCity();
    getPropertyCountInCity();
  }, [lineGraphSlectedCity]);

  const getCountByCity = async () => {
    let result = await axios(
      `http://localhost:3001/hotels/countbycity?cities=delhi,hydrabad,vizag`
    );
    setHotelCountInCityData(result.data);
    console.log(result.data, "hotel count");
  };

  const getPropertyCountInCity = async () => {
    let result = await axios(
      `http://localhost:3001/hotels/countbytypeandcity?city=${lineGraphSlectedCity}`
    );
    setPropertyCountInCity(result.data);
    console.log(result.data, "property count");
  };

  return (
    // <div className="bookings_container">
    //   {/* <CustomGooglMaps /> */}
    //   <div>
    //     <h4>No of hotels in each city</h4>
    //     <MUIChartsPractice data={hotelCountInCityData} />
    //   </div>
    //   {propertyCountInCity ? (
    //     <div>
    //       <h4>No of diff type of properties in city</h4>
    //       <MUILineChart dataV={propertyCountInCity} />
    //       <div></div>
    //     </div>
    //   ) : null}
    // </div>
    <Container>
      <Row>
        <Col sm={12} lg={6}>
          <div>
            <h4>No of hotels in each city</h4>
            <MUIChartsPractice data={hotelCountInCityData} />
          </div>
        </Col>
        {propertyCountInCity ? (
          <Col sm={12} lg={6}>
            <div>
              <h4>No of diff type of properties in city</h4>
              <MUILineChart dataV={propertyCountInCity} />
            </div>
            <div className="d-flex justify-content-evenly w-75">
              <div className="radio_btn_container">
                <input
                  type="radio"
                  name="cities"
                  onChange={(e) =>
                    e.target.checked && setLineGraphSelectedCity("vizag")
                  }
                />
                <label className="radio_btn_label">Vizag</label>
              </div>
              <div className="radio_btn_container">
                <input
                  type="radio"
                  name="cities"
                  checked={lineGraphSlectedCity === "hydrabad"}
                  onChange={(e) =>
                    e.target.checked && setLineGraphSelectedCity("hydrabad")
                  }
                />
                <label className="radio_btn_label">Hyderabad</label>
              </div>
              <div className="radio_btn_container">
                <input
                  type="radio"
                  name="cities"
                  onChange={(e) =>
                    e.target.checked && setLineGraphSelectedCity("delhi")
                  }
                />
                <label className="radio_btn_label">Delhi</label>
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default Analytics;
