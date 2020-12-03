import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/register" component={Register} />

            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
