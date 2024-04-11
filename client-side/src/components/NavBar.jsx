import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "./CSS/NavBar.css";

function NavBar() {
  return (
    <>
      <div id="navbar" className="flex flex-row justify-between text-darkred">
        <div id="comp1">
          <img src={logo} alt="logo" />
        </div>
        <div id="comp2" className="flex flex-row justify-around">
          <Link to={"/"}>
            <div>Home</div>
          </Link>
          <Link to={"/about"}>
            <div>About</div>
          </Link>
          <Link to={"/signin"}>
          <div>Sign In</div>
          </Link>
          <Link to={"/signup"}>
          <div id="new-user" className="bg-darkred text-white hover:bg-white hover:text-darkred">
            New User?
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
