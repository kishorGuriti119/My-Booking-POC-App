import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { assetsIcons } from "../../common/utility";
import "./style.css";

export default function SimpleDialogDemo({ setShowTooltip }) {
  let loginUser = JSON.parse(localStorage.getItem("loggedUser"));
  const navigatesTo = useNavigate();
  const [dummyState, setDummyState] = useState("");

  const loggingOut = () => {
    localStorage.removeItem("loggedUser");
    setDummyState("userloggedout");
    navigatesTo("/Booking.com");
    setShowTooltip(false);
  };

  return (
    <Box
      className="card_style"
      onMouseLeave={() => setShowTooltip(false)}
      sx={{
        display: "flex ",
        flexDirection: "column",
        gap: 1,
        p: "0px",
      }}
    >
      <Box className="profie_card_list_item mt-2">
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() =>
            navigatesTo(`/Booking.com/user/${loginUser.username}/profile`)
          }
        >
          <Avatar src={assetsIcons.user_Icon} sx={{ width: 16, height: 16 }} />
          <Typography>Profile</Typography>
        </Box>
      </Box>
      <Box className="profie_card_list_item">
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() =>
            navigatesTo(`/Booking.com/user/${loginUser.username}/profile`)
          }
        >
          <Avatar
            src={assetsIcons.manage_accoutns}
            sx={{ width: 16, height: 16 }}
          />
          <Typography>Manage account</Typography>
        </Box>
      </Box>
      <Box className="profie_card_list_item">
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() =>
            navigatesTo(
              `/Booking.com/user/${loginUser.username}/profile/bookings`
            )
          }
        >
          <Avatar
            src={assetsIcons.bookingsIcons}
            sx={{ width: 16, height: 16 }}
          />
          <Typography>Bookings & Trips</Typography>
        </Box>
      </Box>
      <Box className="profie_card_list_item">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={assetsIcons.reviewsIcon}
            sx={{ width: 16, height: 16 }}
          />
          <Typography>Reviews</Typography>
        </Box>
      </Box>
      <Box className="profie_card_list_item">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={assetsIcons.settings} sx={{ width: 16, height: 16 }} />
          <Typography>Settings</Typography>
        </Box>
      </Box>
      <Box className="profie_card_list_item mb-2" onClick={loggingOut}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={assetsIcons.logout} sx={{ width: 16, height: 16 }} />
          <Typography>Sign out</Typography>
        </Box>
      </Box>
    </Box>
  );
}
