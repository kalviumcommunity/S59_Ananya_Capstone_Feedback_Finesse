import React, {useEffect, useState, useContext} from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";
import {loginContext} from "../App"

function NavBar() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const { login, setLogin } = useContext(loginContext);

  useEffect(() => {
      const fetchUsername = sessionStorage.getItem("username");
      setUsername(fetchUsername)
  }, [login, setLogin]);


  return (
    <>
      <div id="navbar" className="flex flex-row justify-between text-darkred">
          <Link to={"/"}> 
        <div id="comp1">
          {/* <img src={logo} alt="logo" /> */}
        </div>
          </Link>
        <div id="comp2" className="flex flex-row justify-around">
          <Link to={"/about"}>
            <div>About</div>
          </Link>
          <Link to={"/dashboard/home"}>
            <div>{username ? <><i className='bx bxs-user-circle' style={{fontSize: "4vh"}}></i>&nbsp;{username}</> : "Dashboard"}</div>
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
