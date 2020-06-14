import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import "./RegistrationForm.css"

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("register account button works");
  };

  render() {
    return (
      <div className="registrationWrapper">
        <nav className="loginNav">
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className="loginPageLink"
          >
            Login
          </Link>
          <br />
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className="HomePageLink"
          >
            Movie Night
          </Link>
        </nav>
        <div className="Intro">
          <h2>Make an account</h2>
        </div>
        <form className="registrationForm" onSubmit={this.handleSubmit}>
          <div className="email">
            <label htmlFor="RegistrationForm_email">Email</label>
            <input required name="email" id="Registration_email" autocomplete="email"/>
          </div>
          <div className="password">
            <label htmlFor="RegistrationForm_password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="Registration_password"
              autocomplete="new-password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func,
};