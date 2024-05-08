import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompleteRegister({googleData, setLogin, login}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [countdown, setCountdown] = useState(3);
    // console.log(googleData)

    useEffect(() => {
      if (countdown === 0) {
        setShowPopup(false);
        navigate("/dashboard/home");
        setLogin(!login);
        return () => clearInterval(countdown);
      }
    }, [countdown, navigate, login, setLogin]);

    const handleSubmit = async () => {
        // e.preventDefault();
        if (googleData.name && googleData.emailID && googleData.role && username && password) {

            const tosend = {
                name: googleData.name,
                email: googleData.emailID,
                username: username,
                password: password,
                role: googleData.role
            }

          try {
            const response = await fetch(
              `${import.meta.env.VITE_URI}/register/signup`,
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
              sessionStorage.clear();
              sessionStorage.setItem("name", googleData.name);
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("email", googleData.emailID);
              sessionStorage.setItem("role", googleData.role);
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
    <section id="completeregister" className='flex flex-col'>
        <h2>Please complete your registration process to join the family !</h2>
        <h5>Enter your username</h5>
        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
        <h5>Enter a password for your account</h5>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Finish Registration</button>
    </section>
        {showPopup && (
          <div className="countdown-parent">
            <div>You will be redirected to the dashboard in {countdown}</div>
          </div>
        )}
    </>
  )
}

export default CompleteRegister