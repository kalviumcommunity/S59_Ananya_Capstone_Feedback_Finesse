import Dashboard from "@/components/Dashboard";
import React, { useEffect, useState, useContext } from "react";
import "./DashCSS/Profile.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginContext } from "../App";
import Cookies from "js-cookie"
import Loader from "../components/Loader";

function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
  });
  
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { login, setLogin } = useContext(loginContext);
  const [isLogoutDisabled, setIsLogoutDisabled] = useState(false);

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email") 
    const role = sessionStorage.getItem("role") 
    setUserData({ username, name, email, role });

    if (showPopup) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setLogin(!login);
        clearInterval(timer);
        navigate("/");
      }, countdown * 1000);
      return () => clearInterval(timer);
    }

  }, [showPopup, countdown, login, navigate, setLogin]);

  
const handleLogout = async () => {
  setLoader(true)
  try {
    const response = await fetch(`${import.meta.env.VITE_URI}/register/logout`, {
    credentials: 'include',
    });
    if (response.ok) {
      sessionStorage.clear();
      setShowPopup(true);
      toast.success("Logout Successful !")
      setIsLogoutDisabled(true);
      Cookies.remove('token');
      Cookies.remove('name');
      Cookies.remove('username');
      Cookies.remove('email');
      Cookies.remove('role');
      setLoader(false)
    } 
    else {
      console.error(`Cannnot Logout at this moment.`);
    }
  }
  catch (error) {
  console.error('Error during logout', error);
}
};

  return (
    <>
    <section className="main">   
      <div className="dashboard-parent">
      <Dashboard />
      </div>
      <div className="content-main flex flex-col justify-center items-center">
        { loader ? <Loader /> : null }
        <div className="profile-container flex flex-col">
            <h2 className="flex items-center justify-center">USER PROFILE<i className='bx bxs-user-detail ml-3'></i></h2>
            <span className="text-left">
            <div>
                <strong>username:</strong> {userData.username}
            </div>
            <div>
                <strong>name:</strong> {userData.name}
            </div>
            <div>
                <strong>email:</strong> {userData.email}
            </div>
            <div>
                <strong>role:</strong> {userData.role}
            </div>
            </span>
        </div>
        <button onClick={handleLogout} disabled={isLogoutDisabled}  className="logout flex items-center">Logout<i className='bx bx-log-out ml-2'></i></button>
      </div>
      {showPopup && (
        <div className="countdown-parent">
          <div>You will be redirected to home in {countdown}</div>
        </div>
      )}
      </section>
    </>
  );
}

export default Profile;
