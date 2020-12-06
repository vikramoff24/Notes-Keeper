import React, { Fragment, useContext, useEffect } from "react";
import NoteForm from "../notes/NoteForm";
import Notes from "../notes/Notes";
import AuthContext from "../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <NoteForm />
      <div className="note-section">
        <Notes />
      </div>
    </Fragment>
  );
};

export default Home;
