import Dashboard from "@/components/Dashboard";
import React, { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import MakePost from "./MakePost";

function AllTickets() {
  const [complaintData, setComplaintData] = useState({
    title: "",
    content: "",
    picture: "",
    username: sessionStorage.getItem("username"),
    universityID: "",
    hostel: ""
  })
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([]);
  const [showMakePost, setShowMakePost] = useState(false)

  const uploadImage = (e) => {
    e.preventDefault()
    if (imageUpload == null) {return}
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload)
    .then((e) => {
      toast.info("Your image has been uploaded")
      getDownloadURL(e.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setComplaintData((prevData) => ({
          ...prevData,
          picture: url
        }));
      })
    })
    .catch((err) => {
      toast.error("There was an error while uploading your image")
      console.log(err)
    })
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tosend = complaintData
      const response = await fetch(`${import.meta.env.VITE_URI}/complaint/makepost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tosend),
      });
      const data = await response.json();
      // console.log(data)
      setComplaintData({
        title: "",
        content: "",
        picture: "",
        username: "",
        universityID: "",
        hostel: "",
      });
      setImageUpload(null);
    } 
    
    catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
    <section className="main">
      <div>
      <Dashboard />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <button onClick={() => setShowMakePost(!showMakePost)}>{showMakePost ? "Go back to viewing all posts" : "Click to make a post"}</button>
    
        {showMakePost ? <MakePost setImageUpload={setImageUpload} uploadImage={uploadImage} imageUpload={imageUrls} handleSubmit={handleSubmit} handleChange={handleChange} complaintData={complaintData}/> : "hi"
      }
        
        
      </div>
    </section>
    <ToastContainer/>
    </>
  );
}

export default AllTickets;
