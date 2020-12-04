import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import NoteContext from "../../context/note/noteContext";
const NoteForm = (props) => {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;

  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const [bool, setBool] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevVal) => {
      return { ...prevVal, [name]: value };
    });

    if (name === "description") {
      setBool(true);
    }
  };

  const handleClick = (event) => {
    addNote(note);
    setNote({
      title: "",
      description: "",
    });
    setBool(false);
    event.preventDefault();
  };
  return (
    <div>
      <form autoComplete="off" className="create-note">
        {bool && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
          />
        )}
        <textarea
          name="description"
          placeholder="Take a note..."
          value={note.description}
          onChange={handleChange}
        />
        {/* <Zoom in={!bool ? false : true}> */}
        <Fab onClick={handleClick}>
          <AddIcon />
        </Fab>
        {/* </Zoom> */}
      </form>
    </div>
  );
};

export default NoteForm;
