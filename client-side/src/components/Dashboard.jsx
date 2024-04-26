import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../CSS/Dashboard.css"

function Dashboard() {

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email") 
    const role = sessionStorage.getItem("role") 
    setUserData({ username, name, email, role });
  }, []);

  return (
    <>
    {userData.name ? 
    
        <div className="sidebar">
          <ul>
          <li>
            <Link to={"/dashboard/home"}>
            <i className="bx bx-home"></i>
            </Link>
            <span className="tooltip">Home</span>
          </li>
            <li>
              <Link to={"/dashboard/all"}>
              <i className="bx bx-street-view"></i>
              </Link>
              <span className="tooltip">All complaints</span>
            </li>
            <li>
              <Link to={"/dashboard/user"}>
              <i className="bx bx-edit"></i>
              </Link>
              <span className="tooltip">Your tickets</span>
            </li>
            <li>
              <Link to={"/dashboard/profile"}>
              <i className="bx bxs-contact"></i>
              </Link>
              <span className="tooltip">Profile</span>
            </li>

            <li>
              <Link to={"/dashboard/contact"}>
              <i className="bx bxs-phone"></i>
              </Link>
              <span className="tooltip">Contact us</span>
            </li>
          </ul>
        </div>
        : "please log in"}
    </>
  )
}

export default Dashboard