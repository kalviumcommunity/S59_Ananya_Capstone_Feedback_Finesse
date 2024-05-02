import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
import React from "react";

function MyTickets() {
  return (
    <>
    <section className="main">
    <div className="dashboard-parent">
      <Dashboard />
    </div>
      <Loader/>
    </section>
    </>
  );
}

export default MyTickets;
