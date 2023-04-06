import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import {UserContext} from "../context/musicstore.context";
const NotificationManager = () => {
  const { notification, showNotification, setShowNotification } =
    useContext(UserContext);
  /**
   * Closes the Notification pop up
   * @param {*} event - click event
   * @param {*} reason
   * @returns none.
   */
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

  return (
    <Snackbar
      open={showNotification}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      
      <Alert severity={notification?.flag}>{notification?.message}</Alert>
    </Snackbar>
  );
};

export default NotificationManager;
