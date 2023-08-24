import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewNote from "./ViewNote";


export default function Noteitems(props) {
  const { inote } = props;

  const navigate = useNavigate();

  const location = useLocation();

  const handleViewNote = () => {
    // Navigate to the new route for the full-page view
    navigate(`/viewNote/${inote._id}`);
  };

  const timestamp = inote.date;

  // Create a new Date object from the timestamp string
  const dateObj = new Date(timestamp);
  
  // Convert to Indian Standard Time (IST) using toLocaleString with appropriate options
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  
  const indianTime = dateObj.toLocaleString("en-IN", options);
  const capitalise = (word) => {
    const text = word.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const inputstyle = {
    background: `${props.mode !== "dark" ? "#292828" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  return (
    <>
    <div className="col-md-3" key={inote._id}>
      <button
        className="btn btn-primary  my-3"
        style={{
          padding: "0px",
          background: `${props.mode !== "dark" ? "white" : "black"}`,
          border: `${props.mode !== "dark" ? "1px solid white" : "1px solid black"}`,
          // width:'250px'
        }}
        onClick={handleViewNote}
      >
        <span
          className="badge"
          style={{ background: "rgb(138, 143, 150)", top: "-2px", left: "30%",color:"black" }}
        >
         {capitalise(inote.tag)}
        </span>
        <div className="card">
          <div className="card-body" style={inputstyle}>
            <div className="d-flex align-items-center justify-content-center">
              <h5 className="card-title mx-2">{inote.Heading}</h5>
            </div>
            <p style={{ textAlign: "center",fontSize:'12px' }} className="card-text">
            {indianTime}
            </p>
          </div>
        </div>
      </button>
      {location.pathname === `/viewNote/${inote._id}` && <ViewNote />}
    </div>
    </>
  );
}
