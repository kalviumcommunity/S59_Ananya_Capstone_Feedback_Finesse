import Dashboard from "@/components/Dashboard";
import React, { useEffect, useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import MakePost from "./MakePost";
import "./DashCSS/AllTickets.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import del from "../assets/delete.png"
import edit from "../assets/edit.png"
import user from "../assets/profile.png"
// import ConfirmDelete from "./ConfirmDelete";

function AllTickets() {

  const [complaintData, setComplaintData] = useState({
    title: "",
    content: "",
    picture: [],
    username: sessionStorage.getItem("username"),
    universityID: "",
    hostel: "",
  });
  
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [showMakePost, setShowMakePost] = useState(false);
  const [post, setPost] = useState([]);
  const [imageIndex, setImageIndex] = useState(Array(post.length).fill(0));
  const [likes, setLikes] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [clickedID, setClickedID] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URI}/complaint/viewpost`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setPost(res)
        setImageIndex(Array(res.length).fill(0));
        const initialLikes = {};
        res.forEach((post) => {
          initialLikes[post._id] = false;
        });
        setLikes(initialLikes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);

  const toggleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId]
    }));
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) {
      return;
    }
    var count = 0;
    imageUpload.forEach((file) => {
      // console.log(imageUrls);
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then((e) => {
          if (count == 0) {
            toast.info("Your image has been uploaded");
          }
          count++;
          getDownloadURL(e.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
            setComplaintData((prevData) => ({
              ...prevData,
              picture: url,
            }));
          });
        })
        .catch((err) => {
          toast.error("There was an error while uploading your image");
          console.log(err);
        });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "picture") {
      setComplaintData((prevData) => ({
        ...prevData,
        picture: imageUrls,
      }));
    } else {
      setComplaintData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      complaintData.picture = imageUrls;
      const tosend = complaintData;
      const response = await fetch(
        `${import.meta.env.VITE_URI}/complaint/makepost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tosend),
        }
      );

      if (response.ok) {
        setComplaintData({
          title: "",
          content: "",
          picture: [],
          username: "",
          universityID: "",
          hostel: "",
        });
        setImageUpload([]);
        setImageUrls([]);
        toast.success("Your post is now live !");
      } 
      
      else if (response.status === 400) {
        toast.error("Please upload relevant pictures to your problem");
      } 
      
      else {
        toast.error("There was a server error");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLeft = (fileid, totalImages) => {
    const postIndex = post.findIndex((e) => e._id === fileid);
    if (postIndex !== -1) {
      setImageIndex((prevIndexes) => {
        const updatedIndexes = [...prevIndexes];
        updatedIndexes[postIndex] = updatedIndexes[postIndex] === 0 ? totalImages - 1 : updatedIndexes[postIndex] - 1;
        return updatedIndexes;
      });
    }
  };
  
  const handleRight = (fileid, totalImages) => {
    const postIndex = post.findIndex((e) => e._id === fileid);
    if (postIndex !== -1) {
      setImageIndex((prevIndexes) => {
        const updatedIndexes = [...prevIndexes];
        updatedIndexes[postIndex] = updatedIndexes[postIndex] === totalImages - 1 ? 0 : updatedIndexes[postIndex] + 1;
        return updatedIndexes;
      });
    }
  };

  const handledeletePost = (id) => {
    setClickedID(id)
    setConfirmDelete(true);
  };

  return (
    <>
      <section className="main">
        <div className="dashboard-parent">
          <Dashboard />
        </div>
        <div className="main-child flex flex-col justify-center items-center w-full">
          <button
            id="goback-toview"
            className="publish text-sm"
            onClick={() => setShowMakePost(!showMakePost)}
          >
            {showMakePost ? (
              <h2>
                <i className="bx bxs-arrow-to-left"></i> Go back to viewing all
                posts
              </h2>
            ) : (
              "Click to make a post"
            )}
          </button>

          {showMakePost ? (
            <MakePost
              setImageUpload={setImageUpload}
              uploadImage={uploadImage}
              imageUpload={imageUpload}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              complaintData={complaintData}
            />
          ) : (
            <>
              <div className="allpost">
                {post.slice().reverse().map((file, index) => (
                  <div id="eachpost" key={index} className="flex flex-row justify-between">

                  <span className="flex flex-row justify-between">
                    
                    <span className="flex flex-col justify-start">
                      <h3 className="text-darkred font-bold flex flex-row items-center user"> <img style={{height: "8vh", width: "8vh"}} src={user} alt="" className="mr-3" /> <span>{file.username}</span></h3>
                      <hr style={{backgroundColor: "black", height: "0.2vh", width: "30vw"}} className="mb-4" />
                      <h3 className="flex flex-row items-center"><i className='bx bxs-id-card mr-1 text-3xl' style={{color: "#900000"}}></i>University ID: <span className="ml-2">{file.universityID}</span></h3>
                      <h3 className="flex flex-row items-center"><i className='bx bxs-building-house mr-1 text-3xl' style={{color: "#900000"}}></i>Hostel: <span className="ml-2">{file.hostel}</span></h3>
                      <h3 className="flex flex-row items-center">Status:<span className="flex flex-row items-center"><i className='ml-2 mr-1 bx bxs-circle' style={{color: file.status == "Submitted" ? "#900000" : file.status == "In Progress" ? "yellow" : "green"}}></i>{file.status}</span></h3>
                      <h3>Title: <span>{file.title}</span></h3>
                    </span>

                    <span>
                    {file.picture && file.picture.length > 0 && (
                      <>
                      <h5 className="text-center text-sm mt-2 mb-2">{imageIndex[index] + 1} of {file.picture.length} images</h5>
                      <div className="flex flex-row space-evenly items-center justify-center">
                        <ArrowBackIosIcon className={file.picture.length > 1 ? "workingarrow" : "disablearrow"} onClick={() => handleLeft(file._id, file.picture.length)}  />
                        <img src={file.picture[imageIndex[index]]} alt="" />
                        <ArrowForwardIosIcon className={file.picture.length > 1 ? "workingarrow" : "disablearrow"} onClick={() => handleRight(file._id, file.picture.length)}  />
                      </div>
                    {/* {confirmDelete ? <ConfirmDelete clickedID={clickedID} setConfirmDelete={setConfirmDelete} setClickedID={setClickedID} /> : null} */}
                      {/* <ConfirmDelete/> */}
                      </>
                    )}
                    </span>
                  </span>

                  <span>
                    <h3 className="mt-2">Description: <br /> <span>{file.content}</span></h3>
                  </span>
                    {/* <hr style={{width: "100%", height: "0.2vh", backgroundColor: "#999900"}} className="mt-7"/> */}
                  <span className="flex flex-row justify-between mt-3" id="last-buttons">
                  <div onClick={() => toggleLike(file._id)}>
                    {!likes[file._id] ? (
                      <i className='bx bx-like text-5xl text-darkred'></i>
                    ) : (
                      <i className='bx bxs-like text-5xl text-darkred'></i>
                    )}
                  </div>
                      <div className="flex flex-row items-center gap-4 mr-8">
                        <button className="flex flex-row items-center" >Edit <img src={edit} alt="edit" className="ml-1"/> </button>
                        <button className="flex flex-row items-center" onClick={() => handledeletePost(file._id)}>Delete <img src={del} alt="delete" className="ml-1"/></button>
                      </div>
                    </span>
                    
                  </div>
                ))}
              </div>
            </>
          )}   
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default AllTickets;
