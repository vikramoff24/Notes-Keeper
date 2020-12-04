import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem("token"), //vanila javascript for accessing local storage in browser
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, intialState);

  //actions
  const loadUser = async () => {
    if (localStorage.token);
    setAuthToken(localStorage.token);
  };
  return <div></div>;
};

export default AuthState;
