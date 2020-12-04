import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../../context/note/noteContext";
const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { notes } = noteContext;
  return notes.map((note) => (
    <NoteItem
      _id={note._id}
      title={note.title}
      description={note.description}
    />
  ));
};

export default Notes;
