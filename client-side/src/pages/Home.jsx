import React from "react";
import "../CSS/Home.css";
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
import World from "../components/World"
import ai from "../assets/ai.jpg"
import { Tooltip, Zoom } from "@mui/material";

export default function Home() {

  return (
    <>
    <div id="interact-with-bot-notif">
      <Tooltip title="Login in to interact with our AI bot" arrow placement="right" TransitionComponent={Zoom}>
      <img src={ai} alt="ai" />
      </Tooltip>
    </div>
    <section id="home">
      <section id="text">
        <h1>
        <Typewriter
        options={{
          strings: ['Upgrade Your Hostel Life with', 'Feedback Finesse !'],
          autoStart: true,
          loop: true,
          delay: 80
        }}
        />
        </h1>
        <h4>Your Voice, Our Action</h4>
        <Link to={'/dashboard/home'}>
        <button>START NOW</button>
        </Link>
      </section>
      <section id="pic">
        {/* <img src={home} alt="" /> */}
      </section>
      <section className="h-[90vh]">
      {/* <World/> */}
          <section className="flex items-center justify-evenly">
          <div className="world-parent"> <World /> </div>
          <div className="message-login">
            <span><i className='bx bxs-quote-left text-darkred align-center'></i></span>
            <span>Hey there, <br /></span>
            <span>Thank you for showing interest in Feedback Finesse <br />
            You're just a click away from joining our community and being part of our world !
            </span>
            <Link to={'/signup'}>
            <button className="mt-4"><span>Click here</span></button>
            </Link>
          </div>
        </section>
      </section>
    </section>
    </>
  );
}
