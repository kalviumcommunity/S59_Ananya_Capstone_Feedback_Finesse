import Dashboard from "@/components/Dashboard";
import React, {useEffect, useState} from "react";
import "./DashCSS/DashHome.css"

function DashHome() {
  const [post, setPost] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URI}/complaint/viewpost`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setPost(res)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);

  var count = 0;

  return (
    <>
    <section className="main">

      
    <div className="dashboard-parent">
      <Dashboard />
    </div>

    {sessionStorage.getItem("username") ? (
      <div className="main-child">
      <div id="boxes">
        <div className="dash-box">Total number of posts: {post.length}</div>
        <div className="dash-box">Posts uploaded by you: {post.forEach((e) => {
          if (e.username == sessionStorage.getItem("username")) {
            count += 1
          }
        })} {count}
        </div>
      </div>
    </div>
      ) : null}


    </section>
    </>
  );
}

export default DashHome;
