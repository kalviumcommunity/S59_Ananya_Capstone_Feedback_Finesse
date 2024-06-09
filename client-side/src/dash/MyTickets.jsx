import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import "./DashCSS/MyTickets.css"
import { toast } from "react-toastify"
import Popup from "./Popup";

function MyTickets() {

  const [filterData, setFilterData] = useState("All")
  const [loader, setLoader] = useState(false)
  const [post, setPost] = useState([])
  const [filterPost, setFilterPost] = useState([])
  const role = sessionStorage.getItem("role")
  const username = sessionStorage.getItem("username")

  const [indvPost, setIndvPost] = useState(null)
  const [viewIndvPost, setViewIndvPost] = useState(false)

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
  }, [post, filterData, role, indvPost]);

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
          {viewIndvPost && (
        <Popup indvPost={indvPost} onClose={closePopup} />
        )}
          <div>
            {filterPost.length > 0 ? filterPost.map((file) => (
              <div key={file._id} className="my-eachpost flex justify-between gap-10 flex-wrap">
                <div>
                  <div>{file.title}</div>
                  <div onClick={() => getPostData(file._id)}>Click to view entire post</div>
                </div>
                <div>
                  <div>Status: {file.status}</div>
                  <div>Admin's note: {file.adminNote ? file.adminNote : "Our admins are currently reviewing your request"}</div>
                </div>
              </div>
            )) : 
            <h3>No data found</h3>
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default MyTickets;
