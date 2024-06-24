import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../CSS/Dashboard.css"
import { Tooltip, Button, Zoom, tooltipClasses, styled } from '@mui/material';
import { useNotifications } from '../NotificationsContext';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} sx={{
    padding: "2vh 0vh 2vh 0vh",
    '&:hover': {
      backgroundColor: '#570303', 
    }
  }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.black,
    color: 'white',
    // boxShadow: "2px 3px 5px #570303",
    fontSize: "2.1vh",
    marginLeft: "10vh",
    padding: "1vh 2vh 1vh 2vh",
    marginTop: "1vh",
    backgroundColor: "#960f08"
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#570303',
    fontSize: "2.2vh",
    marginTop: "-6px"
  },
}));

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

  const { notifications } = useNotifications();

  return (
    <>
    {userData.name ? 
        <div className={`sidebar transition-all ease-in-out`}>
        <Link to={"/dashboard/home"}>
          <CustomTooltip arrow TransitionComponent={Zoom} title="Home" placement="right-start">
            <Button>
              <i className="bx bx-home"></i>
            </Button>
          </CustomTooltip>
          </Link>

          <Link to={"/dashboard/all"}>
          <CustomTooltip arrow TransitionComponent={Zoom} title="All Complaints" placement="right-start">
            <Button>
              <i className="bx bx-street-view"></i>
            </Button>
          </CustomTooltip>
              </Link>

              <Link to={"/dashboard/user"}>
          <CustomTooltip arrow TransitionComponent={Zoom} title="Your Tickets" placement="right-start">
            <Button>
              <i className="bx bx-edit"></i>
            </Button>
          </CustomTooltip>
            </Link>

            <Link to={"/dashboard/notifications"}>
          <CustomTooltip arrow TransitionComponent={Zoom} title="Notifications" placement="right-start">
            <Button>
            {notifications.length == 0 ? "" : <span id='notification-badge'>{notifications.length}</span>}
            <i className='bx bxs-bell-ring'></i>
            </Button>
          </CustomTooltip>
              </Link>

            <Link to={"/dashboard/profile"}>
          <CustomTooltip arrow TransitionComponent={Zoom} title="Profile" placement="right-start">
            <Button>
              <i className="bx bxs-contact"></i>
            </Button>
          </CustomTooltip>
              </Link>
        </div>
        : null}
    </>
  )
}

export default Dashboard