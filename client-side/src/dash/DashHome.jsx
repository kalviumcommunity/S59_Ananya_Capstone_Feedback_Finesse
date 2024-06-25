import Dashboard from "@/components/Dashboard";
import React, {useEffect, useState} from "react";
import "./DashCSS/DashHome.css"
import World from "@/components/World";
import Coffee from "./Coffee"
import { Link } from "react-router-dom";
import ChatBot from "./ChatBot";
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

function DashHome() {
  const [post, setPost] = useState([])
  const [user, setUser] = useState([])
  
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URI}/register`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [setUser])
  
  var count = 0;
  var countadmins = 0;

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

      <div className="main-child" style={{alignItems: "start", marginLeft: "0"}}>

      <div id="boxes" className="ml-5 mt-5 flex flex-row">

        <div className="dash-box bg-blue-100 flex flex-col gap-4 border-blue-400 border">
          <div className="bg-blue-800 text-white w-fit rounded-full p-2 text-sm"><DynamicFeedRoundedIcon/></div>
          <div className="flex flex-col gap-6">
            <div className="font-bold text-blue-900 text-4xl">{post.length}</div>
            <div className="text-blue-900 bold text-base">Total number of posts</div>        
          </div>
        </div> 

        <div className="dash-box bg-pink-100 flex flex-col gap-4 border-pink-400 border">
          <div className="bg-pink-800 text-white w-fit rounded-full p-2 text-sm"><EmojiPeopleRoundedIcon/></div>
          <div className="flex flex-col gap-6">
            <div className="font-bold text-pink-900 text-4xl">
              {post.forEach((e) => {
                if (e.username == sessionStorage.getItem("username")) {
                  count += 1
                }
              })} {count}
            </div>
            <div className="text-pink-900 bold text-base">Posts uploaded by you</div>        
          </div>
        </div>  

        <div className="dash-box bg-green-100 flex flex-col gap-4 border-green-400 border">
          <div className="bg-green-800 text-white w-fit rounded-full p-2 text-sm"><GroupsRoundedIcon/></div>
          <div className="flex flex-col gap-6">
            <div className="font-bold text-green-900 text-4xl">{user.length}</div>
            <div className="text-green-900 bold text-base">Total number of users registered with us</div>        
          </div>
        </div>  

        <div className="dash-box bg-purple-100 flex flex-col gap-4 border-purple-400 border">
          <div className="bg-purple-800 text-white w-fit rounded-full p-2 text-sm"><AdminPanelSettingsRoundedIcon/></div>
          <div className="flex flex-col gap-6">
            <div className="font-bold text-purple-900 text-4xl">{user.map((e) => e.role == "admin" ? countadmins += 1 : null)}</div>
            <div className="text-purplr-900 bold text-base">Total number of admins working</div>        
          </div>
        </div>  
      
        
      </div>
      
      <div className="flex flex-col items-center justify-center w-full">
      <ChatBot />
      <Coffee />
      </div>
    </div>
    </section>
    }
    </>
  );
}

export default DashHome 