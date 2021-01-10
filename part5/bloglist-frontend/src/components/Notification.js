import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, isGood }) => {
  const color = isGood ? "green" : "red";
  const style = {
    borderColor: color,
    borderWidth: "3px",
    borderStyle: "solid",
    background: "lightgrey",
    margin: "1em",
    color,
    padding: "0.3em",
  };
  return <div style={style}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isGood: PropTypes.bool.isRequired,
};

export default Notification;
