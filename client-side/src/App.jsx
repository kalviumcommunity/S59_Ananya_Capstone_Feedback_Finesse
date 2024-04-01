import React from "react";
import "./App.css";
import PulseLoader from "react-spinners/PulseLoader";

const colour = "#D0312D"
const size = 20

export default function App() {
  return (
    <>
      <div className="logo">
        Feedback Finesse
        <PulseLoader color={colour} size={size} />
      </div>
    </>
  );
}
