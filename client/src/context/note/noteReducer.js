import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CLEAR_NOTES,
  NOTE_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        loading: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
        loading: false,
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        error: null,
      };
    case NOTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
