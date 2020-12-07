import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../../context/note/noteContext";
const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { getNotes, notes } = noteContext;

  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);

  return notes.map((note) => (
    <NoteItem
      key={note._id}
      title={note.title}
      description={note.description}
    />
  ));
};

export default Notes;
