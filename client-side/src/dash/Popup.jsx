import React, { useState } from "react";
import { Tooltip, Fade, styled, tooltipClasses } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import user from "../assets/profile.png";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} style={{ position: "relative", zIndex: 0 }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Popup = ({ indvPost, onClose }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const getStatusStep = (status) => {
    switch (status) {
      case "Submitted":
        return 0;
      case "In Progress":
        return 1;
      case "Resolved":
        return 2;
      default:
        return 0;
    }
  };

  const handleLeft = () => {
    setImageIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleRight = () => {
    setImageIndex((prevIndex) => Math.min(prevIndex + 4, indvPost.picture.length - 1));
  };

  return (
    <div className="popup-bg-view" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="firstrow flex flex-row items-center justify-between">
          <div>
            <h3 className="text-darkred font-bold flex flex-row items-center user">
             <img style={{ height: "8vh", width: "8vh", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.6)", borderRadius: "50%" }} src={user} alt="" className="mr-3" />
              {indvPost.username}
             </h3>
          </div>
        <div className="progress-tracker flex flex-row">
          <div className="status-tracker">
            <BootstrapTooltip title="Submitted" arrow TransitionComponent={Fade}>
            <div className={`circle ${getStatusStep(indvPost.status) >= 0 ? "active" : ""}`}>1</div>
            </BootstrapTooltip>
            <div className={`line ${getStatusStep(indvPost.status) >= 1 ? "active" : ""}`}></div>
            <BootstrapTooltip title="In Progress" arrow TransitionComponent={Fade}>
            <div className={`circle ${getStatusStep(indvPost.status) >= 1 ? "active" : ""}`}>2</div>
            </BootstrapTooltip>
            <div className={`line ${getStatusStep(indvPost.status) >= 2 ? "active" : ""}`}></div>
            <BootstrapTooltip title="Resolved" arrow TransitionComponent={Fade}>
            <div className={`circle ${getStatusStep(indvPost.status) >= 2 ? "active" : ""}`}>3</div>
            </BootstrapTooltip>
          </div>
        </div>
        </div>

        <div className="secondrow">
          <h3 className="flex items-center font-semibold"><i className='bx bxs-id-card mr-1 text-3xl' style={{ color: "#900000" }}></i>University ID: <span className="ml-1.5">{indvPost.universityID}</span></h3>
          <h3 className="flex items-center font-semibold"><i className='bx bxs-building-house mr-1 text-3xl' style={{ color: "#900000" }}></i>Hostel: <span className="ml-1.5">{indvPost.hostel}</span></h3>
          <h3 className="flex items-center font-semibold"><i className='bx bxs-book-open mr-1 text-3xl' style={{ color: "#900000" }}></i>Issue: <span className="ml-1.5">{indvPost.title}</span></h3>
        </div>

        <div className="thirdrow">
          <span className="ml-4">
            <h3 className="font-bold underline mb-2">Description: </h3>
            <span>
              {indvPost.content}
            </span>
          </span>

          {indvPost.picture && indvPost.picture.length > 0 && (
            <div className="image-slider-controls flex flex-col w-fit">
              <div className="flex items-center justify-between">
                <div>
                  <ArrowBackIosIcon className={imageIndex > 0 ? "workingarrow" : "disablearrow"} onClick={handleLeft} />
                </div>
                <div className="image-slider-content flex">
                  {indvPost.picture
                    .slice(imageIndex, imageIndex + 4)
                    .map((image, imgIndex) => (
                      <img key={imgIndex} src={image} alt={`img-${imgIndex}`} />
                  ))}
                </div>
                <div>
                  <ArrowForwardIosIcon
                    className={imageIndex + 4 < indvPost.picture.length ? "workingarrow" : "disablearrow"}
                    onClick={handleRight}
                  />
                </div>
              </div>
              <div>
                <h5 className="text-sm mt-2 text-center">
                  {Math.min(imageIndex + 4, indvPost.picture.length)} of {indvPost.picture.length} image(s)
                </h5>
              </div>
            </div>
          )}
        </div>
        <hr style={{width: "100%", backgroundColor: "black", height: "1px"}} />
        <div className="admin-note mt-4 ml-5"> <span className="text-darkred font-bold">Admin Note:</span> {indvPost.adminNote ? indvPost.adminNote : "NA"}</div>
        {/* <button onClick={onClose} className="close-popup">Close</button> */}
      </div>
    </div>
  );
};

export default Popup;
