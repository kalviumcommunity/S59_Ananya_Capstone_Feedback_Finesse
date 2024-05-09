import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../CSS/Dashboard.css"
import { Tooltip, Button, Zoom } from '@mui/material';

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
        <div className={`sidebar transition-all ease-in-out`}>
        <Link to={"/dashboard/home"}>
          <Tooltip arrow TransitionComponent={Zoom} title="Home" placement="right-start"
          sx={{
            padding: "2vh 0vh 2vh 0vh",
            '&:hover': {
              backgroundColor: '#570303', 
            }
          }}
          style={{
            '& .MuiTooltip-tooltip': {
              backgroundColor: '#f5f5f9',
              color: 'rgba(0, 0, 0, 0.87)',
              maxWidth: '220px',
              fontSize: '12px',
              border: '1px solid #dadde9',
            },
          }}
          >
            <Button>
              <i className="bx bx-home"></i>
            </Button>
          </Tooltip>
          </Link>

          <Link to={"/dashboard/all"}>
          <Tooltip arrow TransitionComponent={Zoom} title="All Complaints" placement="right-start"
          sx={{
            padding: "2vh 0vh 2vh 0vh",
            '&:hover': {
              backgroundColor: '#570303', 
            }
          }}>
            <Button>
              <i className="bx bx-street-view"></i>
            </Button>
          </Tooltip>
              </Link>

              <Link to={"/dashboard/user"}>
          <Tooltip arrow TransitionComponent={Zoom} title="Your Tickets" placement="right-start"
          sx={{
            padding: "2vh 0vh 2vh 0vh",
            '&:hover': {
              backgroundColor: '#570303', 
            }
          }}>
            <Button>
              <i className="bx bx-edit"></i>
            </Button>
          </Tooltip>
            </Link>

            <Link to={"/dashboard/profile"}>
          <Tooltip arrow TransitionComponent={Zoom} title="Profile" placement="right-start"
          sx={{
            padding: "2vh 0vh 2vh 0vh",
            '&:hover': {
              backgroundColor: '#570303', 
            }
          }}>
            <Button>
              <i className="bx bxs-contact"></i>
            </Button>
          </Tooltip>
              </Link>
        </div>
        : "please log in"}
    </>
  )
}

export default Dashboard