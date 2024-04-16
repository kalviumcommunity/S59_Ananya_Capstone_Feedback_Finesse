import React from "react";
import "./CSS/Register.css";
import register from "../assets/login.jpg";
import social from "../assets/social.png"

function Register() {
  return (
    <>
      <section className="in-parent">
        <section id="register">
          <div>
            <img src={register} alt="register" />
          </div>
          <form action="">
              <h2>Create an Account</h2>
            <div id="input-fields">
              <div>
                <h5>Name</h5>
                <input type="text" />
              </div>
              <div>
                <h5>Email</h5>
                <input type="email" />
              </div>
              <div>
                <h5>Username</h5>
                <input type="text" />
              </div>
              <div>
                <h5>Password</h5>
                <input type="password" />
              </div>
            </div>
            <button type="submit">Register</button>
          <h4>Already a registered user? <u>Sign in</u> from here</h4>
          <span>
            <span><hr /></span>
            <span>Or</span>
            <span><hr /></span>
          </span>
          <button type="submit">
            <img src={social} alt="" />
            Sign up with Google</button>
          </form>
        </section>
      </section>
    </>
  );
}

export default Register;
