import React, { useReducer } from "react";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";
import axios from "axios";
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CLEAR_NOTES,
  NOTE_ERROR,
} from "../types";
const NoteState = (props) => {
  const initalState = {
    notes: [],
    error: null,
  };

  const [state, dispatch] = useReducer(noteReducer, initalState);

  //actions

  //Get notes
  const getNotes = async () => {
    try {
      const res = await axios.get("/api/notes");
      dispatch({ type: GET_NOTES, payload: res.data });
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.response.data.msg });
    }
  };
  //Add notes
  const addNote = async (note) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/notes", note, config);
      dispatch({ type: ADD_NOTE, payload: res.data });
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.response.data.msg });
    }
  };
  //Delete notes
  const deleteNote = async (_id) => {
    try {
      await axios.delete(`/api/notes/${_id}`);
      dispatch({ type: DELETE_NOTE, payload: _id });
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.response.data.msg });
    }
  };
  //Clear notes
  const clearNotes = () => {
    dispatch({ type: CLEAR_NOTES });
  };
  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        getNotes,
        addNote,
        deleteNote,
        clearNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
