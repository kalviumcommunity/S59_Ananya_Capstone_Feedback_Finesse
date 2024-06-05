import React, { useState } from 'react'
import "./DashCSS/ConfirmDelete.css"
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ConfirmDelete({deletePost, setConfirmDelete, setDeletePost}) {

  const [loader, setLoader] = useState(false)

  const canceldeletePost = (e) => {
    if (e.target.classList.contains('parent-confirm')) {
      toast.info("Your post wasn't deleted");
      setConfirmDelete(false);
      setDeletePost(null);
    }
  };

  const handleNoClick = (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
    setDeletePost(null);
  };

  const confirmdeletePost = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URI}/complaint/delete/${deletePost}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setConfirmDelete(false);
        setDeletePost(null);
        toast.info("Your post was deleted");
      } 
      else {
        toast.error("Server error");
      }
    } 
    
    catch (error) {
      toast.error("Server error");
    } 
    
    finally {
      setLoader(false);
    }
  };

  return (
    <>
    {loader ? <Loader /> : null}
      <div className="parent-confirm" onClick={canceldeletePost}>
      <div className="confirm">
      <p>Are you sure you want to delete this post ?</p>
      <div className='flex justify-center flex-wrap'>
        <button className='confirm-but' onClick={confirmdeletePost}>Yes</button>
        <button className='cancel-but' onClick={handleNoClick}>No</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ConfirmDelete
