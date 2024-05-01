import React from 'react'

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
  
              <h4>Choose the relevant place</h4>
              <select name="hostel" id="" onChange={handleChange}>
                <option value="NA">Select from here</option>
                <option value="NGH">New Girls Hostel</option>
                <option value="Gargi">Gargi Hostel</option>
                <option value="Teresa">Teresa Hostel</option>
                <option value="Aryabhatta">Aryabhatta Hostel</option>
                <option value="Bose">Bose Hostel</option>
                <option value="Chanakya">Chanakya Hostel</option>
                <option value="Mess">Hostel Mess</option>
              </select>
  
              <h4>Add relevant pictures</h4>
              <input onChange={(e) => {
                const filesArray = Array.from(e.target.files)
                // console.log(filesArray)
                setImageUpload(filesArray)
                }} type="file" src="" alt="" accept="image/*" multiple/>
              <button onClick={uploadImage}>Click to upload the image</button>
              {/* {console.log(imageUpload)} */}
              <button type="submit" onClick={handleSubmit} className="m-6 publish" disabled={!validateForm()}>Submit</button>
            </form>
          </div>
    </>
  )
}

export default MakePost