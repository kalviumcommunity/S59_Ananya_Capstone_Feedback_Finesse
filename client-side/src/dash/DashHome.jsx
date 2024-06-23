import Dashboard from "@/components/Dashboard";
import React, {useEffect, useState} from "react";
import "./DashCSS/DashHome.css"
import World from "@/components/World";
import Coffee from "./Coffee"
import { Link } from "react-router-dom";
import ChatBot from "./ChatBot";

function DashHome() {
  const [post, setPost] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URI}/complaint/viewpost`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setPost(res)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);

  var count = 0;

  return (
    <>
    {!sessionStorage.getItem("username") ? 
    <>
    <section className="message-main">
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
      <div className="world-parent"> <World /> </div>
    </section>
    </> :

    <section className="main flex flex-row">      
    
      <div className="dashboard-parent">
        <Dashboard />
      </div>

      <div className="main-child">
      <div id="boxes">
        <div className="dash-box">Total number of posts: {post.length}</div>
        <div className="dash-box">Posts uploaded by you: {post.forEach((e) => {
          if (e.username == sessionStorage.getItem("username")) {
            count += 1
          }
        })} {count}
        </div>
        <div className="dash-box">Total number of users registered with us: </div>
        <div className="dash-box">Number of posts made today</div>
      </div>

      <ChatBot />
      {/* <Coffee /> */}
    </div>
    </section>
    }
    </>
  );
}

export default DashHome
