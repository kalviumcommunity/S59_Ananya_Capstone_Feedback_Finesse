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
  const [showMakePost, setShowMakePost] = useState(null);

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) {
      return;
    }
    var count = 0;
    imageUpload.forEach((file) => {
      console.log(imageUrls);
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
      } else if (response.status === 400) {
        toast.error("Please upload relevant pictures to your problem");
      } else {
        toast.error("There was a server error");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const [post, setPost] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleLeft = (n) => {
    setImageIndex((prevIndex) => (prevIndex === 0 ? n - 1 : prevIndex - 1));
  };

  const handleRight = (n) => {
    setImageIndex((prevIndex) => (prevIndex === n - 1 ? 0  : prevIndex + 1));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URI}/complaint/viewpost`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPost(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);

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
                {post.map((file, index) => (
                  <div id="eachpost" key={index} className="flex flex-row justify-between">
                    <span>
                    <h3>Name: {file.username}</h3>
                    <h3>University ID: {file.universityID}</h3>
                    <h3>Title: {file.title}</h3>
                    <p>Content: <span>{file.content}</span></p>
                    <p>Hostel: {file.hostel}</p>
                    </span>

                    <span>
                    <h5 className="text-center">{imageIndex + 1} of {file.picture.length} images</h5>
                    <div className="flex flex-row space-evenly items-center justify-center">
                    <ArrowBackIosIcon className={file.picture.length > 1 ? "workingarrow" : "disablearrow"} onClick={() => handleLeft(file.picture.length)} />
                    <img src={file.picture[imageIndex]} alt="" />
                    <ArrowForwardIosIcon className={file.picture.length > 1 ? "workingarrow" : "disablearrow"} onClick={() => handleRight(file.picture.length)} />
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
