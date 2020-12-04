import React, { useReducer } from "react";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";
import { v4 as uuidv4 } from "uuid";
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_NOTES,
  UPDATE_NOTE,
  FILTER_NOTES,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
  NOTE_ERROR,
} from "../types";
const NoteState = (props) => {
  const initalState = {
    notes: [
      {
        _id: "1",
        title: "title 1",
        description: "description 1...............",
      },
      {
        _id: "2",
        title: "title 2",
        description: "description 2...............",
      },
      {
        _id: " 3",
        title: "title 3",
        description: "description 3...............",
      },
    ],
  };

  const [state, dispatch] = useReducer(noteReducer, initalState);

  //actions

  //Get notes

  //Add notes
  const addNote = (note) => {
    note._id = uuidv4();
    dispatch({ type: ADD_NOTE, payload: note });
  };
  //Delete notes
  const deleteNote = (_id) => {
    dispatch({ type: DELETE_NOTE, payload: _id });
  };
  //Clear notes

  return <div></div>;
};

export default NoteState;
