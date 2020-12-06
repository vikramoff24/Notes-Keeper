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

export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id != action.payload),
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: null,
        error: null,
      };
    default:
      return state;
  }
};
