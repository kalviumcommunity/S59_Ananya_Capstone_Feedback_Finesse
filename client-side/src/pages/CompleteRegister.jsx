import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/CompleteRegister.css";
import Cookies from "js-cookie"

function CompleteRegister({ googleData, setLogin, login }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [token, setToken] = useState('');
  // console.log(googleData)

  useEffect(() => {
    if (countdown === 0) {
      setShowPopup(false);
      navigate("/dashboard/home");
      setLogin(!login);
      return () => clearInterval(countdown);
    }
  }, [countdown, navigate, login, setLogin]);

  const onSubmit = async (data) => {
    // e.preventDefault();
    if (googleData.name && googleData.emailID && googleData.role && data.username && data.password) {
      const tosend = {
        name: googleData.name,
        email: googleData.emailID,
        username: data.username,
        password: data.password,
        role: googleData.role,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_URI}/register/signup`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(tosend),
            credentials: 'include'
          }
        );

        const message = await response.json();

        if (response.ok) {
          toast.success("Congratulations for registering with us !");
          // toast.info("Almost done ! Complete the registration process now");
          sessionStorage.clear();
          sessionStorage.setItem("name", googleData.name);
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("email", googleData.emailID);
          sessionStorage.setItem("role", googleData.role);
          setToken(message.token)

          Cookies.set('token', token, { expires: 1 })
          Cookies.set('name', googleData.name, { expires: 1 })
          Cookies.set('username', googleData.username, { expires: 1 })
          Cookies.set('email', googleData.email, { expires: 1 })
          Cookies.set('role', googleData.role, { expires: 1 })

          setShowPopup(true);
          setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
          setLogin(!login);
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

  return (
    <>
      <section id="completeregister" className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>
            Please complete your registration process to join the family !
          </h2>
          <div>
            <h5>Enter your username</h5>
            <input
              type="text"
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
              className={errors.username ? "input-error" : ""}
              onBlur={() => trigger("username")}
            />
            <h6>{errors.username?.message}</h6>
          </div>
          <div>
            <h5>Enter a password for your account</h5>
            <input
              type="password"
              {...register("password", {
                required: "Enter your password please!",
                pattern: {
                  value: /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?`~])\S+$/,
                  message:
                    "Your password must have at least one special character!",
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
              className={errors.password ? "input-error" : ""}
              onBlur={() => trigger("password")}
            />
            <h6>{errors.password?.message}</h6>
          </div>
          <button type="submit">
            <span>Finish Registration</span>
          </button>
        </form>
      </section>
      {showPopup && (
        <div className="countdown-parent">
          <div>You will be redirected to the dashboard in {countdown}</div>
        </div>
      )}
    </>
  );
}

export default CompleteRegister;
