import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CancelConfirmation(props) {
  console.log(props.triggeredBooking);

  return (
    <React.Fragment>
      <Dialog
        open={props.showCancelConfirmationDialog}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Cancellation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            marginBottom={"24px"}
          >
            {`are you sure want to cancell this booking?`}
          </DialogContentText>

          <DialogContentText fontWeight={"bold"}>
            {`Hotel : - ${props.triggeredBooking.name}`}
          </DialogContentText>

          <DialogContentText fontWeight={"bold"}>
            {`Booking Dates : ${
              props.triggeredBooking.unavailableDates[0]
            } -  ${
              props.triggeredBooking.unavailableDates[
                props.triggeredBooking.unavailableDates.length - 1
              ]
            } `}
          </DialogContentText>

          <DialogContentText fontWeight={"bold"}>
            {`Room Number - ${props.triggeredBooking.number}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancellationConfirmed} sx={{ color: "Black" }}>
            Yes
          </Button>
          <Button onClick={props.handleClose} autoFocus sx={{ color: "Black" }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
