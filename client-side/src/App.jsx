import React, { useState, useContext, createContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ScrollToTop from "react-scroll-to-top";
import Profile from "./dash/Profile";
import AllTickets from "./dash/AllTickets";
import MyTickets from "./dash/MyTickets";
import Contact from "./dash/Contact";
import DashHome from "./dash/DashHome";
import Notifications from "./dash/Notifications"
import { NotificationsProvider } from './NotificationsContext';

export const loginContext = createContext(null);

export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <>
      <loginContext.Provider value={{ login, setLogin }}>
        <NotificationsProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/dashboard/home" element={<DashHome/>}/>
            <Route path="/dashboard/profile" element={<Profile/>}/>
            <Route path="/dashboard/all" element={<AllTickets/>}/>
            <Route path="/dashboard/user" element={<MyTickets/>}/>
            <Route path="/dashboard/contact" element={<Contact/>}/>
            <Route path="/dashboard/notifications" element={<Notifications/>}/>

          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <ScrollToTop
          style={{ backgroundColor: "#fffff000", height: "5vh", width: "5vh" }}
          smooth
          component={
            <i
              className="bx bxs-up-arrow-square"
              id="scrolltotop"
              style={{ fontSize: "8vh", color: "#900000" }}
            ></i>
          }
        />
        </NotificationsProvider>
      </loginContext.Provider>
    </>
  );
}
