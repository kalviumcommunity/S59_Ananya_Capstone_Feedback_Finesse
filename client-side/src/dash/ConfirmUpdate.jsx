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
  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hostel') setHostelInputValue(value);
    else if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
    else if (name === 'universityID') setUniversityID(value);
  };
  
  const cancelupdatepost = (e) => {
    if (e.target.classList.contains('parent-update')) {
      toast.info("Your post wasn't updated");
      setUpdatePost(false);
    }
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setUpdatePost(false);
  };

  const confirmupdatepost = async () => {
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
    setLoader(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_URI}/complaint/update/${updateID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        toast.error("There was an unidentified error");
        return;
      }

      const new_val = await response.json();
      setUpdateID(new_val._id);
      setPost((prevPost) => {
        const updatedPost = prevPost.map((post) =>
          post._id === new_val._id ? new_val : post
        );
        return updatedPost;
      });

      toast.success("Your data has been updated");
      setUpdatePost(false);
    } 
    
    catch (err) {
      toast.error("There was an error while updating");
    } 
    
    finally {
      setLoader(false);
    }
  };


  return (
    <>
      <div className="parent-update" onClick={cancelupdatepost}>
        <div className="update">
          
          <TextField className="input" id="outlined-basic" label="Title" variant="standard" name="title" onChange={handleChange} value={title} />

          <TextField
            name="content"
            className="input"
            id="outlined-basic" label="Description" variant="standard"
            onChange={(e) => handleChange(e)}
            value={content}
          ></TextField>

            <TextField
            name="universityID"
            className="input"
            id="outlined-basic" label="University ID" variant="standard"
            onChange={(e) => handleChange(e)}
            value={universityID}
          ></TextField>

        <Autocomplete
          disablePortal
          id="select-box"
          className="mb-3 mt-2 input"
          name="hostel"
          options={hostelnames}
          defaultValue={hostelInputValue}
          // variant="standard"
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              borderRadius: "1vh",
              border: "none"
            },
            "& .MuiInputBase-input": {
              padding: "8vh 1vh 2vh 1vh",
              border: "none"
            },
          }}
          inputValue={hostelInputValue}
          onInputChange={(event, newInputValue) => {
            setHostelInputValue(newInputValue);
            handleChange({ target: { name: "hostel", value: newInputValue } });
          }}
          renderInput={(params) => <TextField {...params} label="Select your hostel from here" />}
        />
        <span className="flex flex-row justify-center">
          <button className="confirm-but" onClick={confirmupdatepost}>Confirm</button>
          <button className="cancel-but" onClick={handleCancelClick}>Cancel</button>
        </span>
        </div>
      </div>
    </>
  );
}

export default ConfirmUpdate;
