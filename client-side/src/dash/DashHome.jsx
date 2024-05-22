import Dashboard from "@/components/Dashboard";
import React, {useEffect, useState} from "react";
import "./DashCSS/DashHome.css"

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
    <section className="message-main flex justify-center items-center w-full">
      <div className="message-login">
        <span><i className='bx bxs-quote-left text-darkred align-center'></i></span>
        <span>Hey there, <br /></span>
        <span>Thank you for showing interest in Feedback Finesse <br />
        You're only one step away from joining the family. Click the button below to avail all advantages that come with being a member 
        </span>
        <button className="mt-4"><span>Click here</span></button>
      </div>
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
      <div>
        Add your review here and get featured !
      </div>
      <div>
        Connect with our admins !
        
      </div>
    </div>
    </section>
    }
    </>
  );
}

export default DashHome
