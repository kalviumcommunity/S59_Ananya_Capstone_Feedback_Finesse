import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";
import ToggleButton from "react-toggle-button";
import social from "../../assets/social.png"

function SignIn() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <>
      <section className="in-parent">
        <section id="signin">
          <h3>Login to access your account</h3>
          <form action="">
            <div>
              <h5>Username</h5>
              <input type="text" />
            </div>
            <div>
              <h5>Password</h5>
              <input type="password" />
            </div>
            <div className="flex flex-row justify-around">
              <div>
                <h5>Are you an Admin ?</h5>
              </div>
              <div className="flex m-3">
                <span>Yes</span>
                <ToggleButton
                  id='toggle'
                  inactiveLabel={"✖"}
                  activeLabel={"✔"}
                  value={isToggled}
                  onToggle={handleToggle}
                />
                <span>No</span>
              </div>
            </div>

            <button type="submit">Login</button>
            <h4 className="text-darkred">
              Not made an account ?  <Link to={'/signup'}>
              <u>Register</u> 
              </Link> from here
            </h4>

            <span className="flex flex-row justify-around items-center w-6/12 mt-4">
              <span>
                <hr className="border border-black h-0"/>
              </span>
              <span>Or</span>
              <span>
                <hr className="border border-black h-0"/>
              </span>
            </span>
            <button type="submit">
            <img src={social} alt="" />
            Sign in with Google</button>
          </form>
        </section>
      </section>
    </>
  );
}

export default SignIn;
