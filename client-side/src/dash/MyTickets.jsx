import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import "./DashCSS/MyTickets.css"
import { toast } from "react-toastify"
import Popup from "./Popup";
import { format, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import { Button, Tooltip, Rating, styled, Box, TextField } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';

const options = [
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'In Progress', label: 'In Progress' }
]

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  0: {

  },
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function MyTickets() {

  const [filterData, setFilterData] = useState("All")
  const [loader, setLoader] = useState(false)
  const [post, setPost] = useState([])
  const [filterPost, setFilterPost] = useState([])
  const role = sessionStorage.getItem("role")
  const username = sessionStorage.getItem("username")

  const [indvPost, setIndvPost] = useState(null)
  const [viewIndvPost, setViewIndvPost] = useState(false)

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const [showTextField, setShowTextField] = useState(false);
  const [adminNote, setAdminNote] = useState({});
  const [statusUpdate, setStatusUpdate] = useState({});
  const [showDropdown, setShowDropdown] = useState({});

  const toggleDropdown = (postId) => {
    setShowDropdown((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };  

  const toggleTextField = (postId) => {
    setShowTextField((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };
  
  const handleAdminNoteChange = (postId, value) => {
    setAdminNote((prev) => ({ ...prev, [postId]: value }));
  };

  const handleStatusChange = (postId, value) => {
    setLoader(true)
    fetch(`${import.meta.env.VITE_URI}/complaint/updateStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, status: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } 
        
        else {
          toast.success("Status updated successfully");
          setPost((prevPosts) => prevPosts.map((post) =>
            post._id === postId ? { ...post, status: value } : post
          ));
          setShowDropdown((prev) => ({ ...prev, [postId]: false }))
          setLoader(false)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Could not update status");
      });
  };
  
  useEffect(() => {
    setLoader(true)
    fetch(`${import.meta.env.VITE_URI}/complaint/viewpost`)
      .then((res) => res.json())
      .then((res) => {
        setPost(res)
        setLoader(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setFilterData, filterData])

  const handleFilterData = (e, type) => {
    e.preventDefault();
    if (type == "All") setFilterData("All")
    if (type == "Resolved") setFilterData("Resolved")
    if (type == "Submitted") setFilterData("Submitted")
    if (type == "In Progress") setFilterData("In Progress")
  }

  const segregateData = () => {
    let filtered = post;

    if (role != "admin") {
      filtered = filtered.filter(post => post.username === username);
    }

    if (filterData != "All") {
      filtered = filtered.filter(post => post.status === filterData);
    }
    setFilterPost(filtered);
  };

  useEffect(() => {
    segregateData()
  }, [post, filterData, role, indvPost, handleStatusChange]);

  const getPostData = (id) => {
    setLoader(true)
    fetch(`${import.meta.env.VITE_URI}/complaint/${id}`)
    .then(res => res.json())
    .then((res) => {
      setIndvPost(res)
      setViewIndvPost(true)
      // console.log(indvPost)
      setLoader(false)
    })
    .catch((error) => {
      console.log(error)
      toast.error("Could not load post data")
    })
  }

  const closePopup = () => {
    setViewIndvPost(false);
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }
  
    const postDate = new Date(date);
    if (isNaN(postDate)) {
      return "Invalid date";
    }
  
    const now = new Date();
    const minutesDifference = differenceInMinutes(now, postDate);
    const hoursDifference = differenceInHours(now, postDate);
    const daysDifference = differenceInDays(now, postDate);
  
    if (minutesDifference < 60) {
      return `Posted ${minutesDifference} minute(s) ago`;
    } else if (hoursDifference < 24) {
      return `Posted ${hoursDifference} hour(s) ago`;
    } else {
      return `Posted on ${format(postDate, "dd MMMM")}`;
    }
  };

  const handleAdminNoteSubmit = (e, postId) => {
    if (adminNote[postId] && adminNote[postId].trim() !== "") {
      fetch(`${import.meta.env.VITE_URI}/complaint/adminNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, adminNote: adminNote[postId] }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Admin note added successfully");
            setShowTextField((prev) => ({ ...prev, [postId]: false }));
            setAdminNote((prev) => ({ ...prev, [postId]: "" }));
            setPost((prevPosts) => prevPosts.map((post) =>
              post._id === postId ? { ...post, adminNote: adminNote[postId] } : post
            ));
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Could not add admin note");
        });
    } 
    
    else {
      toast.error("Please add a note before submitting");
    }
  };


  return (
    <>
      <section className="main">
        <div className="dashboard-parent">
          <Dashboard />
        </div>
        {/* <Loader/> */}
        <div className="main-child ml-7"> 
          { loader ? <Loader /> : null }
          <h1 className="one-myticket">TRACK THE PROGRESS OF YOUR COMPLAINTS</h1>
          <div className="flex gap-4 two-myticket">
            <button className={filterData == "All" ? "option-active" : null} onClick={(e) => handleFilterData(e, "All")}>All</button>
            <button className={filterData == "Resolved" ? "option-active" : null} onClick={(e) => handleFilterData(e, "Resolved")}>Resolved</button>
            <button className={filterData == "Submitted" ? "option-active" : null} onClick={(e) => handleFilterData(e, "Submitted")}>Submitted</button>
            <button className={filterData == "In Progress" ? "option-active" : null} onClick={(e) => handleFilterData(e, "In Progress")}>In Progress</button>
          </div>

          <div>
            {filterPost.length > 0 ? filterPost.map((file) => (
              <div key={file._id} className="my-eachpost">
                <div className="flex justify-between gap-10 flex-wrap">
                <div className="flex flex-col gap-4">
                  <div><span style={{color: "#6e0101", fontWeight: "700", textDecoration: "underline"}}>Title of the post:</span> {file.title}</div>
                  <div className="click-to-view-entirepost" onClick={() => getPostData(file._id)}>click to view entire post</div>
                </div>
                <div className="flex flex-col gap-6">
                  <div><span style={{color: "#6e0101", fontWeight: "700"}}>Status:</span> {file.status}</div>
                  <div><span style={{color: "#6e0101", fontWeight: "700"}}>Admin's note:</span> {file.adminNote ? file.adminNote : "Our admins are currently reviewing your request"}</div>
                </div>
                <p className="dateofpost">{formatDate(file.date)}</p>
                </div>

                {viewIndvPost && (<Popup indvPost={indvPost} onClose={closePopup} /> )}
                
                {role == "admin" ? 
                <>
                <div className="flex items-start justify-between">
                  <div>
                  <button onClick={() => toggleTextField(file._id)}>Add an admin note</button>
                  {showTextField[file._id] && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexWrap: "wrap" }}>
                      <CreateRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="input-with-sx" label="Write down" variant="standard" value={adminNote[file._id] || ""}
                        onChange={(e) => handleAdminNoteChange(file._id, e.target.value)} />
                      <span onClick={(e) => handleAdminNoteSubmit(e, file._id)} className="ml-3 submit-admin-note">Click if done</span>
                    </Box>
                  )}
                  </div>
                 
                  <div className="flex items-center gap-4">
                    {showDropdown[file._id] && (
                      <Dropdown
                        className="mt-5"
                        options={options}
                        value={file.status}
                        onChange={(option) => handleStatusChange(file._id, option.value)}
                        placeholder="Select an option"/>
                    )}                    
                  {!showDropdown[file._id] ? <button onClick={() => toggleDropdown(file._id)}>Update Status</button> : null}
                  </div>
                </div>
                </>
                : 
                <Tooltip followCursor title="You don't have permission to do this">
                <Button className="admindis">Add an admin note</Button>
                </Tooltip>
                }

                {role == "user" ?
                <div className="flex gap-5">
                  <span className="text-black font-mono">Rate our action!</span>
                  <Box sx={{ display: 'flex', alignItems: 'center',gap: 1}}>
                    <StyledRating
                      name="highlight-selected-only"
                      value={value}
                      precision={1}
                      IconContainerComponent={IconContainer}
                      getLabelText={(value) => customIcons[value].label}
                      onChange={(event, newValue) => {setValue(newValue)}}
                      onChangeActive={(event, newHover) => {setHover(newHover)}}
                      highlightSelectedOnly/>
                    {value !== null && (<Box sx={{ ml: 2 }}>{customIcons[hover !== -1 ? hover : value].label}</Box>)}
                  </Box>
                </div> 
                : null }
              </div>
            )) : 
            <h3 className="mt-5 ml-1 font-bold admin-note text-2xl" style={{fontFamily: "Dosis", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.35)"}}>No data found</h3>
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default MyTickets;
