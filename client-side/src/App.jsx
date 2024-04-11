import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<Register/>}/>
      </Routes>
    </>
  );
}
