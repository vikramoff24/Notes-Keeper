import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteContext from "../../context/note/noteContext";
const NoteItem = (props) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;
  const handleClick = () => {
    deleteNote(props._id);
  };
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>

      <button>
        <DeleteIcon onClick={handleClick} />
      </button>
    </div>
  );
};

export default NoteItem;
