import Dashboard from "@/components/Dashboard";
import React, { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import MakePost from "./MakePost";
import "./DashCSS/AllTickets.css"

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

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) {
      return;
    }
    var count = 0;
    imageUpload.forEach((file) => {
      console.log(imageUrls)
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then((e) => {
          if (count == 0) {
            toast.info("Your image has been uploaded")
          }
          count++
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

    }

    // console.log(imageUrls)

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name == "picture") {
        setComplaintData((prevData) => ({
          ...prevData,
          picture: imageUrls,
        }));
      } 
      
      else {
        setComplaintData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      complaintData.picture = imageUrls
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
        toast.success("Your post is now live !")
      }

      else if (response.status === 400) {
        toast.error("Please upload relevant pictures to your problem")
      }

      else {
        toast.error("There was a server error")
      }
    } 
    
    
  catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <section className="main">
        <div className="dashboard-parent">
          <Dashboard />
        </div>
        <div className="main-child flex flex-col justify-center items-center w-full">
          <button id="goback-toview" className="publish text-sm" onClick={() => setShowMakePost(!showMakePost)}>
            {showMakePost
              ? (<h2><i className='bx bxs-arrow-to-left'></i> Go back to viewing all posts</h2>)
              : "Click to make a post"}
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
            "hi"
          )}
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default AllTickets;
