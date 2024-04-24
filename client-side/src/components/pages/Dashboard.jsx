import React, { useState } from "react";
import "../CSS/Dashboard.css";

function Dashboard() {

  return (
    <>
      <section id="main">
        <div className="sidebar">
          <ul>
          <li>
              <i className="bx bx-home"></i>
              <span className="tooltip">Home</span>
            </li>
            <li>
                <i className="bx bx-street-view"></i>
              <span className="tooltip">All complaints</span>
            </li>
            <li>
                <i className="bx bx-edit"></i>
              <span className="tooltip">Your tickets</span>
            </li>
            <li>
                <i className="bx bxs-contact"></i>
              <span className="tooltip">Profile</span>
            </li>

            <li>
                <i className="bx bx-log-out"></i>
              <span className="tooltip">Logout</span>
            </li>

            <li>
                <i className="bx bxs-phone"></i>
              <span className="tooltip">Contact us</span>
            </li>
          </ul>
        </div>

        <div id="contentmain">
          HOME
        </div>
      </section>
    </>
  );
}

export default Dashboard;
