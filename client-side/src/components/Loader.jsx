import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const colour = "#900000";
const size = 20;

export default function Loader() {
  return (
    <div className="logo">
      Feedback Finesse
      <PulseLoader color={colour} size={size} />
    </div>
  );
}
