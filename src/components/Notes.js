import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitems from "./Noteitems";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// import Notefolder from './Notefolder'

export default function Notes(props) {
  const { mode, color } = props;
  const context = useContext(noteContext);
  const { notes, getNotes,clearNote } = context;
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    } else {
        // Fetch notes
        clearNote()
        getNotes()
        .then(() => {
          setLoading(false);
          
        })
        .catch((error) => {
          // Handle any errors here and set loading to false
          console.error("Error fetching notes:", error);
          setLoading(false);
          
        });
    }
    // eslint-disable-next-line
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.tag.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      note.Heading.toLowerCase().includes(props.searchQuery.toLowerCase())||
      note.title.toLowerCase().includes(props.searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="shownotes row m-auto">
        <div className="container text-center my-3">
          {loading  ? (
           <Spinner/>// Replace with your spinner component
          ) : (
            // Show "NO NOTES TO DISPLAY" if there are no notes
            notes.length === 0 && "NO NOTES TO DISPLAY"
            )} 
                 </div>
        {filteredNotes.length > 0
          ? // Display the search results
            filteredNotes.map((inote) => {
              return (
                <Noteitems
                  key={inote._id}
                  inote={inote}
                  mode={mode}
                  color={color}
                />
              );
            })
            : notes.map((inote) => {
              return (
                <Noteitems
                key={inote._id}
                inote={inote}
                mode={mode}
                color={color}
                />
                );
              })}
      </div>
    </div>
  );
}
