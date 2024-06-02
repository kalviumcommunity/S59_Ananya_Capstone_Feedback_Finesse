import React from 'react'
import "./DashCSS/ConfirmDelete.css"
import { toast } from 'react-toastify';

function ConfirmDelete({deletePost, setConfirmDelete, setDeletePost}) {

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
    await fetch(
      `${import.meta.env.VITE_URI}/complaint/delete/${deletePost}`,
      { method: "DELETE" }
    )

    .then(() => {
      toast.info("Your post was deleted");
      setConfirmDelete(false);
    }) 

    .catch(() => {
      toast.error("Server error")
    })
    
  };

  return (
    <>
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
