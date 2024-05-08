import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Register.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signup from "../assets/login.jpg";
import { loginContext } from "../App";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import CompleteRegister from "./CompleteRegister";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { login, setLogin } = useContext(loginContext);
  const data = getValues();
  data.role = "user";
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [completeRegister, setCompleteRegister] = useState(false)
  const [googleData, setGoogleData] = useState({})
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      setShowPopup(false);
      navigate("/dashboard/home");
      setLogin(!login);
      return () => clearInterval(countdown);
    }
  }, [countdown, navigate, login, setLogin]);

  const handleSignup = async () => {
    // e.preventDefault();
    if (data.name && data.username && data.email && data.password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URI}/register/signup`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const message = await response.json();
        if (response.ok) {
          toast.success("Congratulations for registering with us !");
          sessionStorage.clear();
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("role", data.role);
          setShowPopup(true);
          setCompleteRegister(false)
          setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
        } 
        
        else {
          toast.error(message.message);
          console.error("Registration failed");
        }
      } 
      
      catch (error) {
        console.error("Registration failed:", error);
        toast.error("There was an error while registering !");
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
        // console.log(googleres.data)

        const tosend = {
          name: googleres.data.name,
          emailID: googleres.data.email,
          role: "user"          
        }
        setGoogleData(tosend)
        // console.log(tosend)

        const response = await fetch(
          `${import.meta.env.VITE_URI}/google/signup`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tosend),
          }
        );

        const message = await response.json();

        if (response.ok) {
          toast.success("Congratulations for registering with us !");
          setLogin(!login)
          setCompleteRegister(true)
        } 
        
        else {
          toast.error(message.message);
          console.error("Registration failed");
        }

      }
      catch (error) {
        console.log(error)
      }
    }
  });

  const handleGoogleSignup = (e) => {
    e.preventDefault(); 
    googleSubmit(); 
  };

  return (
    <>
      <section className="in-parent">
        <section id="register">
          <div>
            <img src={signup} alt="register" />
          </div>
          <form action="">
            <h2>Create an Account</h2>
            <div id="input-fields">
              <div>
                <h5>Name</h5>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Enter your name please!",
                    minLength: {
                      value: 3,
                      message: "Name must be greater than 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name must be smaller than 30 characters",
                    },
                  })}
                  className={errors.name ? "input-error" : null}
                />
              </div>
              <h6>{errors.name?.message}</h6>
              <div>
                <h5>Email</h5>
                <input
                  type="email"
                  placeholder="Enter your mail ID"
                  className={errors.email ? "input-error" : ""}
                  {...register("email", {
                    required: "Enter your email please!",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              <h6>{errors.email?.message}</h6>
              <div>
                <h5>Username</h5>
                <input
                  type="text"
                  placeholder="Give us a username"
                  className={errors.username ? "input-error" : ""}
                  {...register("username", {
                    required: "Enter your username please!",
                    minLength: {
                      value: 3,
                      message: "Username must be greater than 3 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Username must be smaller than 15 characters",
                    },
                  })}
                />
              </div>
              <h6>{errors.username?.message}</h6>
              <div>
                <h5>Password</h5>
                <input
                  type="password"
                  placeholder="Generate a password"
                  className={errors.password ? "input-error" : ""}
                  {...register("password", {
                    required: "Enter your password please!",
                    pattern: {
                      value: /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?`~])\S+$/,
                      message:
                        "Your password must have at least one special character !",
                    },
                    minLength: {
                      value: 5,
                      message: "Password must be greater than 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be smaller than 20 characters",
                    },
                  })}
                />
              </div>
              <h6>{errors.password?.message}</h6>
            </div>
            <button type="submit" onClick={handleSubmit(handleSignup)}>Register</button>
            <h4>
              Already a registered user?{" "}
              <Link to={"/signin"}>
                <u>Sign in</u>
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
            <button type="submit" onClick={handleGoogleSignup}>
              {/* <img src={social} alt="" /> */}
              <i className="bx bxl-google text-2xl pr-2 googleicon"></i>
              Sign up with Google
            </button>
          </form>
        </section>
        {showPopup && (
          <div className="countdown-parent">
            <div>You will be redirected to the dashboard in {countdown}</div>
          </div>
        )}
        {completeRegister && (
          <CompleteRegister googleData={googleData} setLogin={setLogin} login={login}/>
        )}
      </section>
      <ToastContainer />
    </>
  );
}

export default Register;
