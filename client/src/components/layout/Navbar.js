import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary ">
      <h1 className="header">
        <i className={icon} /> {title}
      </h1>
      <Fragment>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </Fragment>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Notes keeper",
  icon: "fas fa-clipboard",
};
export default Navbar;
