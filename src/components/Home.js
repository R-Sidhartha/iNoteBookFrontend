import React from "react";
import { Link } from "react-router-dom";
import Notes from "./Notes";

export default function Home(props) {
  const{mode,color}=props


  return (
    <div className="container" style={{color: `${mode==='dark' ? 'black':'white'}`,minHeight:'100vh' }}>
      <div className="box d-flex justify-content-between my-3">
        <h2>YOUR NOTES</h2>
        <button className="btn btn-dark" style={{ padding:'0px',height:'40px' }}>
          <Link
            className="nav-link"
            to="/addNote"
            style={{ height: "100%", color: "white" }}
          >
            <h5>Add Notes</h5>
          </Link>
        </button>
      </div>
      <div className="notes">
        <Notes mode={mode} color={color} searchQuery={props.searchQuery}/>
      </div>
    </div>
  );
}
