import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function MakePost({setImageUpload, imageUpload, uploadImage, handleSubmit, handleChange, complaintData}) {

    const validateForm = () => {
        const { title, content, universityID, hostel, picture, username } = complaintData;
        if (!title || !content || !universityID || hostel === "NA" || !hostel || !picture || !imageUpload || !username) {
          // console.log(imageUpload), picture
          return false;
        }
        return true;
      }


  return (
    <>
    <div id="makepost">
          <form className="flex flex-col">
            <h3 style={{fontFamily: 'Numans', fontWeight: "bold"}}>Name: <span>{complaintData.username}</span></h3>
              <label htmlFor="title-makepost">
            <h4>Give us a title for your complaint</h4>
              </label>
              <input type="text" id="title-makepost" name="title" value={complaintData.title} placeholder="What issue are you facing ?" onChange={handleChange} />
  
              <label htmlFor="content-makepost">
                <h4>Explain it in detail</h4>
              </label>
                  
              <textarea id="content-makepost" name="content" value={complaintData.content} placeholder="Give us more context" onChange={handleChange} />
  
              <label htmlFor="universityID-makepost">
                <h4>University ID:</h4>
              </label>
              <input type="text" id="universityID-makepost" name="universityID" value={complaintData.universityID} onChange={handleChange} />
  
              <h4 className='mb-2'>Choose the relevant place</h4>

              <Autocomplete
                disablePortal
                id="select-box"
                options={hostelnames}
                onChange={(curr) => {
                  handleChange({ target: { name: "hostel", value: curr?.label || "" } });
                }}
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
                renderInput={(params) => <TextField {...params} label="Select from here" />}
              />

              <h4 className='mt-6'>Add relevant pictures</h4>
              <input className='shadow-none w-fit' style={{boxShadow: "none"}} onChange={(e) => {
                const filesArray = Array.from(e.target.files)
                // console.log(filesArray)
                setImageUpload(filesArray)
                }} type="file" src="" alt="" accept="image/*" multiple/>

              <button onClick={uploadImage} className='bg-gray-500 w-fit p-2 ml-1 rounded-xl text-base upload-image-button text-white'>Click to upload the image <i className='bx bxs-cloud-upload'></i></button>
              {/* {console.log(imageUpload)} */}
              <button type="submit" onClick={handleSubmit} className="m-6 publish" disabled={!validateForm()}>Submit</button>
            </form>
          </div>
    </>
  )
}

const hostelnames = [
  { label: 'New Girls Hostel', value: "NGH"  },
  { label: 'Gargi Hostel', value: "Gargi" },
  { label: 'Teresa Hostel', value: "Teresa"},
  { label: 'Aryabhatta Hostel', value: "Aryabhatta" },
  { label: 'Bose Hostel', value: "Bose" },
  { label: "Chanakya Hostel", value: "Chanakya" },
  { label: 'Hostel Mess', value: "Hostel Mess" }
];

export default MakePost