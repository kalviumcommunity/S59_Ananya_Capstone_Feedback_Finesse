import React from "react";
import "./App.css";
import PulseLoader from "react-spinners/PulseLoader";

export default function App() {
  return (
    <>
      <div className="logo">
        Feedback Finesse
        <PulseLoader color="#D0312D" size={20} />
      </div>
    </>
  );
}
