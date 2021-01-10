import React from "react";

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

export default Notification;
