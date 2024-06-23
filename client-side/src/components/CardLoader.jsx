import React from 'react'
import "../CSS/CardLoader.css"
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
function CardLoader() {
  return (
    <div className="card-loader">
    <div className="child">
      <SmartToyTwoToneIcon style={{ fontSize: "6.5vh", position: "relative", top: "3px", color: "#260000" }} />
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
      <div className="line4"></div>
    </div>
    </div>
  )
}

export default CardLoader