import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noteContext from "../context/Notes/noteContext";
import ConfirmModal from "./ConfirmModal";

const ViewNote = (props) => {
  const { showalert } = props;
  const { noteId } = useParams();
  const context = useContext(noteContext);
  const { note, fetchNoteById, editnote, deletenote } = context;
  const [isEditing, setIsEditing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [editableNote, setEditableNote] = useState({
    eHeading: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateCounts = (text) => {
    if (text) {
      const trimmedText = text.trim();
      const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
      const chars = text.length;
      setWordCount(words);
      setCharCount(chars);
    }
  };

  useEffect(() => {
    // Fetch the note details using the noteId
    fetchNoteById(noteId);
    // eslint-disable-next-line
  }, [noteId]);

  useEffect(() => {
    // Update the word and char counts when the component first loads
    if (note && note.description) {
      updateCounts(note.description);
    }
  }, [note]);

  useEffect(() => {
    // Update editableNote when the 'note' changes
    if (note) {
      setEditableNote({
        eHeading: note.Heading,
        etitle: note.title,
        edescription: note.description,
        etag: note.tag,
      });
      updateCounts(note.description);
    }
  }, [note]);

  const updateNote = (currentnote) => {
    if (currentnote) {
      setEditableNote({
        eHeading: currentnote.Heading,
        etitle: currentnote.title,
        edescription: currentnote.description,
        etag: currentnote.tag,
      });
      setIsEditing(true);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    editnote(
      noteId,
      editableNote.eHeading,
      editableNote.etitle,
      editableNote.edescription,
      editableNote.etag
    );
    showalert("Edited and Saved note Successfully", "success");
    // Disable editing after saving
    setIsEditing(false);
  };

  const onChange = (e) => {
    if (isEditing) {
      setEditableNote({
        ...editableNote,
        [e.target.name]: e.target.value,
      });
      updateCounts(e.target.value);
    }
  };
  const inputstyle = {
    background: `${props.mode !== "dark" ? "rgba(41, 40, 40, 0.44)" : "white"}`,
    color: `${props.mode === "dark" ? "black" : "white"}`,
  };

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
    deletenote(noteId);
    navigate("/");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableNote.edescription);
  };
  const handleClearSpaces = () => {
    if (isEditing) {
      if (editableNote.edescription) {
        let newText = editableNote.edescription.split(/\s+/);
        setEditableNote({ ...editableNote, edescription: newText.join(" ") });
      }
    }
  };

  // If the note is not loaded yet or not found, you can handle that case here
  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="container my-4"
      style={{
        color: `${props.mode === "dark" ? "black" : "white"}`,
        minHeight: "100vh",
      }}
    >
      <form onSubmit={handleSave}>
        <div
          className="viewhead d-flex"
          style={{
            justifyContent: "space-between",
            padding: "0px 20px",
            alignItems: "center",
          }}
        >
          <h2 className="left">Your Note</h2>
          <div className="box2 d-flex justify-content-between my-3 ">
            <button
              className="btn btn-sm btn-dark mx-1"
              onClick={handleCopy}
            >
              copy
            </button>
            {!isEditing && (
              <button
                className="btn btn-sm btn-dark"
                onClick={() => {
                  updateNote(note);
                }}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <div>
                <button
                  className="btn btn-sm btn-dark mx-2"
                  onClick={handleClearSpaces}
                  hidden={!isEditing ? true : false}
                >
                  ClearSpaces
                </button>
                <button className="btn btn-sm btn-success" type="submit">
                  Save
                </button>
              </div>
            )}
            <button
              className="btn btn-sm btn-danger mx-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="Heading">Note Heading</label>
          <input
            type="text"
            className="form-control"
            id="eHeading"
            name="eHeading"
            value={editableNote.eHeading}
            onChange={onChange}
            disabled={!isEditing}
            style={inputstyle}
            minLength={3}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={editableNote.etitle}
            onChange={onChange}
            disabled={!isEditing}
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
            id="etag"
            name="etag"
            value={editableNote.etag}
            onChange={onChange}
            disabled={!isEditing}
            style={inputstyle}
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            rows="15"
            value={editableNote.edescription}
            onChange={onChange}
            disabled={!isEditing}
            style={inputstyle}
            minLength={5}
            required
          ></textarea>
        </div>
      </form>
      {showModal && (
        <ConfirmModal
          title="Delete Note ?"
          message="Are you sure you want to delete this note?"
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          handleDelete={handleDelete}
          mode={props.mode}
          color={props.color}
        />
      )}
      <div className="counter my-3">
        Description is of :{" "}
        <b>
          {wordCount} Words and {charCount} characters
        </b>
      </div>
    </div>
  );
};

export default ViewNote;
