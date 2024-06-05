import React from "react";
import "../CSS/Loader.css"
import PulseLoader from "react-spinners/PulseLoader";

const colour = "#900000";
const size = 20;

export default function Loader() {
  return (
    <>
      {/* <PulseLoader color={colour} size={size} /> */}
      <span className="loader-parent">
      <span className="loader"></span>
      </span>
    </>
  );
}
