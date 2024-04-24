import React, {useState, useContext, createContext} from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/pages/About";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import ScrollToTop from "react-scroll-to-top";

export const loginContext = createContext(null);

export default function App() {
  const [login, setLogin] = useState(false)

  return (
    <>
    <loginContext.Provider value={{ login, setLogin }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<Register/>}/>
      </Routes>
      <ScrollToTop style={{backgroundColor: "#fffff000", height: "5vh", width: "5vh" }} smooth component={<i className='bx bxs-up-arrow-square' id="scrolltotop" style={{fontSize: "8vh", color: "#900000"}}></i>} />
    </loginContext.Provider>
    </>
  );
}
