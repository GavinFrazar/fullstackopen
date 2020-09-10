import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  const { msg, isError } = notification;
  const classes = ["notification", isError ? "error" : ""].join(" ");
  return <div className={classes}>{msg}</div>;
};

export default Notification;
