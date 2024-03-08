import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.css";

const User_Profile = ({ setActiveStep, activeStep, steps }) => {
  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));
  const [editable, setEditable] = useState(false);
  const { t, i18n } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  //   const handleDecryptPassword = async (password) => {
  //     const bytes =  CryptoJS.AES.decrypt(password, "secret_key");
  //     const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  //     alert(decryptedPassword);
  //     console.log(decryptedPassword, "decryptedPassword");
  //     return decryptedPassword;
  //   };

  const getUserInfo = async () => {
    let result = await axios.get(
      `http://localhost:3001/users/${loginUser._id}`
    );
    console.log(result);

    const { username, email, password } = result.data;

    setUserInfo({
      username: username,
      email: email,
      password: password,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 4 }}>
        {!editable ? (
          <Box
            sx={{
              position: "relative",
              height: "30px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="edit"
              sx={{
                position: "absolute",
                right: 10,
                top: -5,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={() => setEditable(true)}
              className="onEdit"
            >
              <CreateIcon />
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => setEditable(true)}
              >
                {t("Edit")}
              </Typography>
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ height: "30px" }}></Box>
        )}
        <TextField
          label="User Name"
          value={userInfo?.username}
          disabled={!editable}
          sx={{ backgroundColor: !editable ? "#f2f2f2" : "initial" }}
        />
        <TextField
          label="Email"
          value={userInfo?.email}
          disabled={!editable}
          sx={{ backgroundColor: !editable ? "#f2f2f2" : "initial" }}
        />
        <TextField
          label="password"
          type="password"
          value={userInfo?.password}
          disabled={!editable}
          sx={{ backgroundColor: !editable ? "#f2f2f2" : "initial" }}
        />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", ml: 1, mr: 1 }}
      >
        {activeStep >= 2 ? (
          <Button onClick={() => setActiveStep((prev) => prev - 1)}>
            {t("Back")}
          </Button>
        ) : (
          <span></span>
        )}
        {activeStep < steps.length && !editable ? (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>
            {t("Next")}
          </Button>
        ) : (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>
            {t("Save and Continue")}
          </Button>
        )}
      </Box>
    </>
  );
};
export default User_Profile;
