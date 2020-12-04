import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoteState from "./context/note/NoteState";
function App() {
  return (
    <NoteState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/register" component={Register} />

              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </NoteState>
  );
}

export default App;
