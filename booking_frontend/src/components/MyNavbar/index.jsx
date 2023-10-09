import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import Login from "../../Pages/Login";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyNavbar({ type }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [dummyState, setDummyState] = useState("");

  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));

  const navigate = useNavigate();

  const gotouserpage = (user) => {
    navigate(`/Booking.com/user/${user}/profile`);
  };

  const loggingOut = () => {
    localStorage.removeItem("loggedUser");
    setDummyState("userloggedout");
    navigate("/Booking.com");
  };

  return (
    <Navbar expand="sm" style={{ backgroundColor: "#003580" }}>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/Booking.com"
          style={{ color: "white", textDecoration: "none" }}
        >
          Booking.com
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!loginUser ? (
            <Nav className="ms-auto">
              {/* <Nav.Link className="text-light fw-bold">Register</Nav.Link>{" "} */}
              <Nav.Link
                className="text-light fw-bold"
                onClick={() => setModalShow(true)}
              >
                Login/Register
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link className="text-light ms-auto fw-bold">
                {loginUser.username}
              </Nav.Link>
              {!type && (
                <Nav.Link
                  className="text-light ms-auto fw-bold"
                  onClick={() => gotouserpage(loginUser.username)}
                >
                  Profile
                </Nav.Link>
              )}
              <Nav.Link
                className="text-light ms-auto fw-bold"
                onClick={loggingOut}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      {modalShow && (
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </Navbar>
  );
}

export default MyNavbar;
