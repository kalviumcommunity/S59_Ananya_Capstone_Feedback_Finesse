import React from "react";
import "../CSS/Home.css";
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <>
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
        <button>JOIN NOW</button>
      </section>
      <section id="pic">
        {/* <img src={home} alt="" /> */}
      </section>
    </section>
    </>
  );
}
