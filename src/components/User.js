import React, { useEffect, useState } from "react";

export default function User(props) {

  const [user, setUser] = useState({name:"",userName:""});

  const inputstyle = {
    background: `${props.mode !== "dark" ? "#292828" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  const timestamp = user.date;

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


  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);


  return (
    <div className="container d-flex flex-column  align-items-center" style={{ color: `${props.mode === "dark" ? "black" : "white"}`,minHeight:'100vh' }}>
        <h2 className="my-3 text-center">Profile Info</h2>
      <form  style={{width:'42vw'}}>
        <div className="row mb-3 my-4">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={user.name}
              style={inputstyle}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            UserName :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="username"
              defaultValue={user.UserName}
              style={inputstyle}
              disabled

            />
          </div>
        </div>
        <span style={{float:'right'}}>Created on : {indianTime}</span>
      </form>
    </div>
  );
}
