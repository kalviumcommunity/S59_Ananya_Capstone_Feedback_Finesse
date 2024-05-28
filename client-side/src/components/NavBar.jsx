import React, {useEffect, useState, useContext} from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";
import {loginContext} from "../App"

function NavBar() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"))
  const { login, setLogin } = useContext(loginContext);

  useEffect(() => {
    const fetchUsername = sessionStorage.getItem("username")
    setUsername(fetchUsername)
  }, [login, setLogin]);

  useEffect(() => {
    const checkForCookies = () => {
      const cookies = document.cookie.split("; ");
      const cookieMap = {};
      cookies.forEach(cookie => {
        const [name, ...rest] = cookie.split("=");
        const value = decodeURIComponent(rest.join("=")); 
        cookieMap[name] = value;
      });

      // console.log(cookieMap)
      // console.log(document.cookie)
      
      if (cookieMap.token) sessionStorage.setItem("token", cookieMap.token);
      if (cookieMap.username) sessionStorage.setItem("username", cookieMap.username);
      if (cookieMap.name) sessionStorage.setItem("name", cookieMap.name);
      if (cookieMap.email) sessionStorage.setItem("email", cookieMap.email);
      if (cookieMap.role) sessionStorage.setItem("role", cookieMap.role);
    };
  
    checkForCookies();
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
          <div id="new-user" className="bg-darkred text-white">
            New User?
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
