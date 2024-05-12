import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";

function ConfirmUpdate({
  updateID,
  setUpdateID,
  setUpdatePost,
  toSend,
  complaintData,
  setComplaintData,
  setPost,
}) {
  const hostelnames = [
    "New Girls Hostel",
    "Gargi Hostel",
    "Teresa Hostel",
    "Aryabhatta Hostel",
    "Bose Hostel",
    "Chanakya Hostel",
    "Hostel Mess",
  ];

  const [hostelInputValue, setHostelInputValue] = useState(toSend.hostel);
  const [title, setTitle] = useState(toSend.title || "");
  const [content, setContent] = useState(toSend.content || "");
  const [universityID, setUniversityID] = useState(toSend.universityID || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hostel') setHostelInputValue(value);
    else if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
    else if (name === 'universityID') setUniversityID(value);
  };
  
  const cancelupdatepost = () => {
    toast.info("Your post wasn't updated");
    setUpdatePost(false);
  };

  const confirmupdatepost = () => {
    if (!title || !content || !universityID || !hostelInputValue) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedData = {
      ...toSend,
      title,
      content,
      universityID,
      hostel: hostelInputValue,
    };

    fetch(`${import.meta.env.VITE_URI}/complaint/update/${updateID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else toast.error("There was an unidentified error");
      })
      .then((new_val) => {
        // console.log(new_val);
        setUpdateID(new_val._id);

        setPost((prevPost) => {
          const updatedPost = prevPost.map((post) =>
            post._id === new_val._id ? new_val : post
          );
          // console.log("updated post", updatedPost);
          return updatedPost;
        });

        toast.success("Your data has been updated");
        setUpdatePost(false);
      })

      .catch((err) => {
        toast.error("There was an error while updating");
      });
  };

  return (
    <>
      <div id="parent-update">
        <div id="update">
          <h5>Title</h5>
          <input type="text" name="title" onChange={(e) => handleChange(e)} value={title} />

          <h5>Description</h5>
          <textarea
            name="content"
            id=""
            onChange={(e) => handleChange(e)}
            value={content}
          ></textarea>

          <h5>University ID</h5>
          <input type="text" name="universityID" onChange={(e) => handleChange(e)} value={universityID} />

        <Autocomplete
          disablePortal
          id="select-box"
          name="hostel"
          options={hostelnames}
          defaultValue={hostelInputValue}
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              borderRadius: "1vh",
              border: "none",
            },
            "& .MuiInputBase-input": {
              padding: "8vh 1vh 2vh 1vh",
              border: "none",
            },
          }}
          inputValue={hostelInputValue}
          onInputChange={(event, newInputValue) => {
            setHostelInputValue(newInputValue);
            handleChange({ target: { name: "hostel", value: newInputValue } });
          }}
          // onInputChange={(e) => handleChange(e)}
          renderInput={(params) => <TextField {...params} label="Select from here" />}
        />
          <button onClick={confirmupdatepost}>Confirm</button>
          <button onClick={cancelupdatepost}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default ConfirmUpdate;
