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
        {/* <Loader/> */}
        <div className="flex items-center w-screen justify-center">
        <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
          <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

export default MyTickets;
