import React, { Component } from "react";
import {Link} from 'react-router-dom';


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('login button works')
    };


    render() {
        return (
          <div className="loginWrapper">
            <nav className="loginNav">
              <Link
                to={"/registration"}
                style={{ textDecoration: "none" }}
                className="registrationPageLink"
              >
                Create Account
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
              <h2>
                Decide what movie you and your friends want to watch together!
              </h2>
              <h3>
                This app will help you create a voting list of your movie
                choices, and everyone in the group can vote which movie they
                want to watch
              </h3>
            </div>
            <form className="LoginForm" onSubmit={this.handleSubmit}>
              <div className="email">
                <label htmlFor="LoginForm_email">Email</label>
                <input required name="email" id="LoginForm_email" />
              </div>
              <div className="password">
                <label htmlFor="LoginForm_password">Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  id="LoginForm_password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        );
    }
}
