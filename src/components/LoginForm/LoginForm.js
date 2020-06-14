import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-services";
import TokenService from "../../services/token-service";
import "./LoginForm.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;
    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state
    return (
      <div className="loginWrapper">
        <nav className="loginNav">
          <Link
            to={"/search"}
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
            This app will help you create a voting list of your movie choices,
            and everyone in the group can vote which movie they want to watch!
          </h3>
        </div>
        <form className="LoginForm" onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
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
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <br />
        <p>Are you a new user? Register to create an account</p>
        <Link
          to={"/registration"}
          style={{ textDecoration: "none" }}
          className="registrationPageLink"
        >
          <button>Register</button>
        </Link>
      </div>
    );
  }
}
