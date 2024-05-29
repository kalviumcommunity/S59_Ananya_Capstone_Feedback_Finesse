import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./DashCSS/MakePost.css"
import { LinearProgress, Box, linearProgressClasses, styled } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  overflow: 'hidden',
  position: 'relative',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffb0b0"
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#900000',
    position: 'absolute',
    width: '30%',
    height: '100%',
    animation: 'move 2s linear infinite',
    '@keyframes move': {
      '0%': { transform: 'translateX(-130%)' },
      '100%': { transform: 'translateX(330%)' }
    }
  },
}));

const GreenTick = styled('div')({
  display: 'inline-block',
  color: 'green',
  fontSize: '24px',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateX(-40%)' },
    '100%': { opacity: 1, transform: 'translateX(0%)' }
  }
});

// const FileInputContainer = styled('div')({

// });

const HiddenFileInput = styled('input')({
  display: 'none'
});



function MakePost({setImageUpload, imageUpload, uploadImage, handleSubmit, handleChange, complaintData, uploading}) {

  const validateForm = () => {
    const { title, content, universityID, hostel, picture, username } = complaintData;
    if (!title || !content || !universityID || !hostel || !picture || !imageUpload || !username) {
      return false;
    }
    return true;
  }

  const [hostelInputValue, setHostelInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 90;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      setImageUpload(filesArray);
      setFileNames(filesArray.map(file => file.name));
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImageUpload(filesArray);
    setFileNames(filesArray.map(file => file.name));
  };

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

              {/* {console.log(hostelInputValue)} */}
              <Autocomplete
                disablePortal
                id="select-box"
                options={hostelnames}
                // value={hostelInputValue}
                inputValue={hostelInputValue}
                onInputChange={(event, newInputValue) => {
                  setHostelInputValue(newInputValue);
                  handleChange({ target: { name: "hostel", value: newInputValue } });
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
              <div className='flex flex-row items-end'>
                <div
                  className={`text-center file-input-container ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}>
                  <span className='flex flex-row items-center'><i className='bx bx-upload mr-3 text-2xl font-bold'></i>
                  Drag and drop images here
                  </span>
                    or <br />
                    <span style={{ color: '#007bff', cursor: 'pointer' }}>Browse</span> from this device
                  <HiddenFileInput id='file-upload' type="file" onChange={handleFileChange} accept="image/*" multiple />
                </div>

                <ul className='currently-uploaded'>
                  {fileNames.map((fileName, index) => (
                    <li className='each-uploaded' key={index}>{fileName}</li>
                  ))}
                </ul>

              </div>
              <button onClick={uploadImage} className='p-2 ml-1 rounded-xl upload-image-button'>
                {uploading == null ? 
                <>
                Click to upload the image(s) <i className='bx bxs-cloud-upload'></i>
                </> : uploading == true ?
                <>
                <Box sx={{ width: '100%' }}>
                  <BorderLinearProgress variant="determinate" value={progress} />
                </Box>
                </> : 
                <>
                <GreenTick>
                  <i className="fas fa-check-circle"></i>
                </GreenTick>
                </>}
              </button>
              {/* <i class='bx bx-image-add'></i> */}
              <button type="submit" onClick={handleSubmit} className="m-6 publish" disabled={!validateForm()}>Submit</button>
            </form>
          </div>
    </>
  )
}

const hostelnames = [
  'New Girls Hostel',
  'Gargi Hostel',
  'Teresa Hostel',
  'Aryabhatta Hostel',
  'Bose Hostel',
  "Chanakya Hostel",
  'Hostel Mess' 
];

export default MakePost