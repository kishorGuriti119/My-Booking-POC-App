import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";

const Featured = () => {
  return (
    <>
      <Container>
        {/* <marquee> */}
        <Row>
          <Col sm={12} md={4}>
            <div className="card-style">
              <h1 className="city-name">Delhi</h1>
              <p className="property-style">200 Properties</p>
            </div>
          </Col>

          <Col sm={12} md={4}>
            <div className="card-style2">
              <h1 className="city-name">Vizag</h1>
              <p className="property-style">200 Properties</p>
            </div>
          </Col>

          <Col sm={12} md={4}>
            <div className="card-style3">
              <h1 className="city-name">Hydrabad</h1>
              <p className="property-style">200 Properties</p>
            </div>
          </Col>
        </Row>
        {/* </marquee> */}
      </Container>
    </>
  );
};

export default Featured;
