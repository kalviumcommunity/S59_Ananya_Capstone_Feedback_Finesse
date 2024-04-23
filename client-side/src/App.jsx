import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/pages/About";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import Register from "./components/pages/Register";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<Register/>}/>
      </Routes>
    </>
  );
}
