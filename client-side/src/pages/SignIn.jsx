import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import { useForm } from "react-hook-form";
import ToggleButton from "react-toggle-button";
import { toast, ToastContainer } from "react-toastify";
import { loginContext } from "../App";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function SignIn() {
  const [isToggled, setIsToggled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const data = getValues();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { login, setLogin } = useContext(loginContext);
  const [countdown, setCountdown] = useState(3);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  useEffect(() => {
    if (countdown === 0) {
      setShowPopup(false);
      navigate("/dashboard/home");
      setLogin(!login);
      return () => clearInterval(countdown);
    }
  }, [countdown, navigate, login, setLogin]);

  // console.log(isToggled)

  const handleLogin = async () => {
    // e.preventDefault();
    if (data.username && data.password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URI}/register/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const message = await response.json();

        if (response.ok) {
          const role = isToggled ? "admin" : "user";
          if (message.role != role) {
            toast.error(
              "Please log in with valid credentials for the specified role !"
            );
          } else {
            toast.success("You have successfully logged in !");
            sessionStorage.clear();
            sessionStorage.setItem("username", message.username);
            sessionStorage.setItem("name", message.name);
            sessionStorage.setItem("email", message.email);
            sessionStorage.setItem("role", message.role);
            setShowPopup(true);
            setInterval(() => {
              setCountdown((prev) => prev - 1);
            }, 1000);
          }
        } 
        
        else {
          console.error("Login failed");
          toast.error("Please check the entered details !");
        }
      } 
      
      catch (error) {
        console.error("Login failed:", error);
        toast.error("Any account with the given credential(s) does not exist!");
      }

    } 
  };

  const googleSubmit = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleres = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        })
        // console.log(googleres.data.email)
        const tosend = {
          emailID: googleres.data.email
        }

        const response = await fetch(
          `${import.meta.env.VITE_URI}/google/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tosend),
          }
        );

        const message = await response.json();

        if (response.ok) {
          toast.success("You have successfully logged in !");
          sessionStorage.clear();
          sessionStorage.setItem("username", message.username);
          sessionStorage.setItem("name", message.name);
          sessionStorage.setItem("email", message.email);
          sessionStorage.setItem("role", message.role);
          setShowPopup(true);
          setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
        } 
        
        else {
          console.log(message.message)
          console.error("Login failed");
          toast.error("Please check the entered details !");
        }
      } 
      
      catch (error) {
        console.error("Login failed:", error);
        toast.error("Any account with the given credential(s) does not exist!");
      }
    }
  });

  return (
    <>
      <section className="in-parent w-full box-border">
        <section id="signin">
          <h3>Login to access your account</h3>
          <form action="" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <h5>Username</h5>
              <input
                type="text"
                placeholder="Enter your username"
                className={errors.username ? "input-error" : ""}
                {...register("username", {
                  required: "Enter your username please!",
                })}
              />
            </div>
            <div>
              <h5>Password</h5>
              <input
                type="password"
                placeholder="Enter your password"
                className={errors.password ? "input-error" : ""}
                {...register("password", {
                  required: "Enter your password please!",
                  pattern: {
                    value: /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?`~])\S+$/,
                    message:
                      "Your password must have at least one special character !",
                  },
                })}
              />
            </div>
            <div className="flex flex-row justify-around">
              <div>
                <h5>Are you an Admin ?</h5>
              </div>
              <div className="flex m-3">
                <span>Yes</span>
                <ToggleButton
                  id="toggle"
                  inactiveLabel={"✖"}
                  activeLabel={"✔"}
                  value={isToggled}
                  onToggle={handleToggle}
                  colors={{
                    activeThumb: {
                      base: "#ffffff",
                    },
                    inactiveThumb: {
                      base: "#ffffff",
                    },
                    active: {
                      base: "#00ab41",
                      hover: "#008630",
                    },
                    inactive: {
                      base: "#900000",
                      hover: "#610000",
                    },
                  }}
                />
                <span>No</span>
              </div>
            </div>

            <button type="submit">Login</button>
          </form>
          <h4 className="text-darkred">
            Not made an account yet?{" "}
            <Link to={"/signup"}>
              <u>Register</u>
            </Link>{" "}
            from here
          </h4>

          <span className="flex flex-row justify-around items-center w-6/12 mt-4">
            <span>
              <hr className="border border-black h-0" />
            </span>
            <span>Or</span>
            <span>
              <hr className="border border-black h-0" />
            </span>
          </span>
          <button type="submit" onClick={() => googleSubmit()}>
            {/* <img src={social} alt="" /> */}
            <i className="bx bxl-google text-2xl pr-2 googleicon"></i>
            Sign in with Google
          </button>
        </section>
        {showPopup && (
          <div className="countdown-parent">
            <div>You will be redirected to the dashboard in {countdown}</div>
          </div>
        )}
      </section>
      <ToastContainer />
    </>
  );
}

export default SignIn;
