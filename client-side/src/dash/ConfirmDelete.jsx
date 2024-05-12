import React from 'react'
import "./DashCSS/ConfirmDelete.css"
import { toast } from 'react-toastify';

function ConfirmDelete({deletePost, setConfirmDelete, setDeletePost}) {

  const canceldeletePost = () => {
    toast.info("Your post wasn't deleted");
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
      <div className="parent-confirm">
      <div className="confirm">
      <p>Are you sure you want to delete this post ?</p>
      <div>
        <button onClick={confirmdeletePost}>Yes</button>
        <button onClick={canceldeletePost}>No</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ConfirmDelete