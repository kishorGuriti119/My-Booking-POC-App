// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import { Button, Container } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// function Login(props) {
//   const [invalidUser, setinvalidUser] = useState(false);
//   const [error, setError] = useState("");
//   const [openReg, setOpenReg] = useState(false);
//   const [regResponse, setRegResponse] = useState("");
//   const [userDetails, setUserDetails] = useState({
//     username: "",
//     password: "",
//   });

//   const [newUserDetails, setNewUserDetails] = useState({
//     username: "",
//     password: "",
//     email: "",
//   });

//   function userLogin() {
//     // if (
//     //   userDetails.username.length === 0 ||
//     //   userDetails.password.length === 0
//     // ) {
//     //   alert("invalid user details");
//     //   setError("please Enter correct details");
//     //   return;
//     // }
//     // setError("");
//     fetch("http://localhost:3001/users/login", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userDetails),
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         // console.log(res, "response");
//         if (!res.error) {
//           props.onHide();
//           setinvalidUser(false);
//           const { createdAt, updatedAt, ...userDetails } = res;
//           localStorage.setItem("loggedUser", JSON.stringify(userDetails));
//         }
//         // setinvalidUser(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   function onRegiser() {
//     fetch("http://localhost:3001/users/register", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newUserDetails),
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         if (!res.result) {
//           setRegResponse("");
//           props.onHide();
//           return;
//         }
//         setRegResponse(res.result);
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >

//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter" className="text-center">
//           {!openReg ? <span>Login</span> : <span>Register</span>}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {!openReg ? (
//           <>

//             <Form.Floating className="mb-3">
//               <Form.Control
//                 id="floatingInputCustom"
//                 type="text"
//                 placeholder="username"
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, username: e.target.value })
//                 }
//               />
//               <label htmlFor="floatingInputCustom">User Name</label>
//             </Form.Floating>
//             <Form.Floating>
//               <Form.Control
//                 id="floatingPasswordCustom"
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, password: e.target.value })
//                 }
//               />
//               <label htmlFor="floatingPasswordCustom">Password</label>
//             </Form.Floating>
//             {invalidUser && <p className="text-danger"> invalid credentials</p>}
//             {error}
//           </>
//         ) : (
//           <>
//             <FloatingLabel
//               controlId="floatingUserName"
//               label="username"
//               className="mb-3"
//             >
//               <Form.Control
//                 type="text"
//                 placeholder="username"
//                 onChange={(e) =>
//                   setNewUserDetails({
//                     ...newUserDetails,
//                     username: e.target.value,
//                   })
//                 }
//               />
//             </FloatingLabel>

//             <FloatingLabel
//               controlId="floatingInput"
//               label="Email address"
//               className="mb-3"
//             >
//               <Form.Control
//                 type="email"
//                 placeholder="name@example.com"
//                 onChange={(e) =>
//                   setNewUserDetails({
//                     ...newUserDetails,
//                     email: e.target.value,
//                   })
//                 }
//               />
//             </FloatingLabel>
//             <FloatingLabel controlId="floatingPassword" label="Password">
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                   setNewUserDetails({
//                     ...newUserDetails,
//                     password: e.target.value,
//                   })
//                 }
//               />
//             </FloatingLabel>
//             <p className="text-danger">{regResponse}</p>
//           </>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         {!openReg && (
//           <>
//             <Button onClick={userLogin}>Login</Button>
//             <span className="text-success" onClick={() => setOpenReg(true)}>
//               Register
//             </span>
//           </>
//         )}
//         {/* <Button onClick={props.onHide}>Close</Button> */}

// {/*
//         //-------------------------------------------- */}
//         {openReg && (
//           <>
//             <Button onClick={onRegiser}>Register</Button>
//             <span className="text-primary" onClick={() => setOpenReg(false)}>
//               Already have Account?
//             </span>
//           </>
//         )}
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default Login;

//----------------------------------------------------------------------------------- updated ----------------//

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.css";

function Login(props) {
  const [invalidUser, setinvalidUser] = useState(false);
  const [error, setError] = useState("");
  const [openReg, setOpenReg] = useState(false);
  const [regResponse, setRegResponse] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [newUserDetails, setNewUserDetails] = useState({
    username: "",
    password: "",
    email: "",
  });

  function userLogin() {
    if (
      userDetails.username.length === 0 ||
      userDetails.password.length === 0
    ) {
      alert("invalid user details");
      setError("please Enter correct details");
      return;
    }
    setError("");
    fetch("http://localhost:3001/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res, "response");
        if (!res.error) {
          props.onHide();
          setinvalidUser(false);
          const { createdAt, updatedAt, ...userDetails } = res;
          localStorage.setItem("loggedUser", JSON.stringify(userDetails));
        }
        // setinvalidUser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegiser() {
    fetch("http://localhost:3001/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserDetails),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.result) {
          setRegResponse("");
          props.onHide();
          return;
        }
        setRegResponse(res.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="text-center"
              >
                {!openReg ? <span>Login</span> : <span>Register</span>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!openReg ? (
                <>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="text"
                      placeholder="username"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          username: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="floatingInputCustom">User Name</label>
                  </Form.Floating>
                  <Form.Floating>
                    <Form.Control
                      id="floatingPasswordCustom"
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="floatingPasswordCustom">Password</label>
                  </Form.Floating>
                  {invalidUser && (
                    <p className="text-danger"> invalid credentials</p>
                  )}
                  {error}
                </>
              ) : (
                <>
                  <FloatingLabel
                    controlId="floatingUserName"
                    label="username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="username"
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          username: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setNewUserDetails({
                          ...newUserDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                  <p className="text-danger">{regResponse}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {!openReg && (
                <>
                  <Button onClick={userLogin}>Login</Button>
                  <span
                    className="text-success"
                    onClick={() => setOpenReg(true)}
                  >
                    Register
                  </span>
                </>
              )}
              {/* <Button onClick={props.onHide}>Close</Button> */}

              {/* 
        //-------------------------------------------- */}
              {openReg && (
                <>
                  <Button onClick={onRegiser}>Register</Button>
                  <span
                    className="text-primary"
                    onClick={() => setOpenReg(false)}
                  >
                    Already have Account?
                  </span>
                </>
              )}
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
