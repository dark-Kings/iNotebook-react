import { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get all Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZWY3M2FmMTQwOWJlMzQ3MWQwOTcyIn0sImlhdCI6MTY2MzA1MTkwNX0.mCe7TzLEJDy-ll1eSd5LSgqjHbvvejp1CFX31TnoxKE"
      }
    });
    const json = await response.json();
    //  console.log(json);
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: Api call 
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZWY3M2FmMTQwOWJlMzQ3MWQwOTcyIn0sImlhdCI6MTY2MzA1MTkwNX0.mCe7TzLEJDy-ll1eSd5LSgqjHbvvejp1CFX31TnoxKE"
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // console.log("deleting the note with id:"+id);
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZWY3M2FmMTQwOWJlMzQ3MWQwOTcyIn0sImlhdCI6MTY2MzA1MTkwNX0.mCe7TzLEJDy-ll1eSd5LSgqjHbvvejp1CFX31TnoxKE"
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return (note._id !== id) });
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZWY3M2FmMTQwOWJlMzQ3MWQwOTcyIn0sImlhdCI6MTY2MzA1MTkwNX0.mCe7TzLEJDy-ll1eSd5LSgqjHbvvejp1CFX31TnoxKE"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    // <Notecontext.Provider value={{state,update}}>
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </Notecontext.Provider>
  )
}


export default Notestate;