import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import noteContext from "../context/Notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setNote] = useState({Heading:"", title: "", description: "", tag: "" });
  const navigate = useNavigate(); // Initialize useHistory
  const handleAdd = (e) => {
    e.preventDefault();
    addnote(note.Heading,note.title, note.description, note.tag);
    props.showalert("Note Added",'success')
    navigate("/"); // Redirect to the Notefolder component after adding the note
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const inputstyle={
    background: `${props.mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,    color: `${props.mode==='dark' ? 'black':'white'}`,
  }
  return (
    <div className="container my-4" style={{color: `${props.mode==='dark' ? 'black':'white'}`,minHeight:'100vh' }}>
      <h2 className="text-center">Enter your Note details </h2>
      <form onSubmit={handleAdd}>
        <div className="form-group my-3">
          <label htmlFor="Heading">Note Heading</label>
          <input
            type="text"
            className="form-control"
            id="Heading"
            name="Heading"
            placeholder="Course name, remainders, etc.."
            onChange={onChange}
            style={inputstyle}
            minLength={3}
            required

          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Give a suitable title for your note.."
            name="title"
            onChange={onChange}
            style={inputstyle}
            minLength={3}
            required

          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Education, Health, To-Do etc.."
            name="tag"
            onChange={onChange}
            style={inputstyle}
            minLength={3}
            required

          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="10"
            placeholder="Enter or paste your text here .."
            type="text"
            onChange={onChange}
            style={inputstyle}
            minLength={5}
            required

          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" >
          Add
        </button>
      </form>
    </div>
  );
}
