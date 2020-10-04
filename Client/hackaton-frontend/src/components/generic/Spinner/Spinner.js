import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <Spinner
      animation="border"
      size="xl"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        top: "30%",
        left: "calc(50% - 50px)",
        color: "#669999",
      }}
    />
  );
};
