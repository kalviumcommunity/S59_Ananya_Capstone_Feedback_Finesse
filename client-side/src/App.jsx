import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
