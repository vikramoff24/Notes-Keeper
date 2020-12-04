import React, { Fragment } from "react";
import NoteForm from "../notes/NoteForm";
import Notes from "../notes/Notes";
const Home = () => {
  return (
    <Fragment>
      <NoteForm />
      <Notes />
    </Fragment>
  );
};

export default Home;
