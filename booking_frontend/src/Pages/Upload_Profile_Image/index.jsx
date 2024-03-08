import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Next } from "react-bootstrap/esm/PageItem";
import notify from "../../components/ToastMessage";

const Upload_Profile_Image = ({ activeStep, setActiveStep, steps }) => {
  const { t, i18n } = useTranslation();
  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));

  const [selectedProfileImage, setSelectedProfileImage] = useState(
    loginUser?.profileImage
  );

  const [generatedCloudUrl, setGeneratedCloudUrl] = useState(
    loginUser?.profileImage
  );

  const handleChange = async (e) => {
    console.log(e.target.files);
    setSelectedProfileImage(e.target.files[0]);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "profilepicture"); // at the time of creating cloudinary account
    data.append("cloud_name", "dyvdwtjoy"); // at the time of creating cloudinary account

    const selectedImageCloudinaryUrl = await axios.post(
      `https://api.cloudinary.com/v1_1/dyvdwtjoy/image/upload`,
      data
    );

    setGeneratedCloudUrl(selectedImageCloudinaryUrl.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      let updateUser = await axios.put(
        `http://localhost:3001/users/update/${loginUser?._id}/uploadProfile`,
        { profileImage: generatedCloudUrl }
      );
      localStorage.removeItem("loggedUser");
      localStorage.setItem("loggedUser", JSON.stringify(updateUser.data));
      notify("Profile Pic Updated", "succuss");
      setTimeout(() => {
        window.location.reload();
      }, 3400);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box sx={{ m: 4 }}>
        <form>
          <input type="file" sx={{ mt: 3 }} onChange={handleChange} />
          <Button
            onClick={handleSubmit}
            disabled={selectedProfileImage === loginUser?.profileImage}
          >
            Upload
          </Button>
        </form>
      </Box>

      {selectedProfileImage && (
        <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
          <img
            src={generatedCloudUrl}
            style={{ objectFit: "fill" }}
            alt="selected_image"
            height={300}
            width={300}
          />
        </Card>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", ml: 1, mr: 1 }}
      >
        <Button onClick={() => setActiveStep((prev) => prev - 1)}>
          {t("Back")}
        </Button>

        {steps.length > activeStep + 1 ? (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>
            {t("Next")}
          </Button>
        ) : (
          <Button>{t("Finish")}</Button>
        )}
      </Box>
    </>
  );
};

export default Upload_Profile_Image;
