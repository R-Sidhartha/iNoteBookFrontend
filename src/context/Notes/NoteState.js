import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebookbackend1-oy2l.onrender.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [note, setNote] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(),
    });
  
    const json= await response.json() 
    setNotes(json)
  }

  // Add a Note
  const addnote = async (Heading,title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken')
      },
      body: JSON.stringify({Heading,title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deletenote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken')
      }
    });
    const json = response.json(); 
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  const fetchNoteById = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/${id}`,{

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('authtoken')
        }
      });
      const data = await response.json();
      setNote(data)
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  };

  // Edit a Note
  const editnote = async (id,Heading, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authtoken')
      },
      body: JSON.stringify({Heading,title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].Heading = Heading;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  const [user,setUser]=useState(
    {
      name:"",
      UserName:""
  }
    )

 const handleuser = async () => {
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authtoken')

      },
    });
    const json = await response.json();
    setUser(json)
    localStorage.setItem("userData", JSON.stringify(json));
  };
  
  return (
    <NoteContext.Provider value={{ notes,note, addnote, deletenote, editnote, getNotes,fetchNoteById,user,handleuser }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;