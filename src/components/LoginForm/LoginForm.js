import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-services";
import TokenService from "../../services/token-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MovieNightContext from "../../MovieNightContext";
import logo from "../../images/gladiator.jpg";
import "./LoginForm.css";


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
});

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static contextType = MovieNightContext;

  handleSubmit = (values) => {
    AuthApiService.postLogin({
      email: values.email,
      password: values.password,
    }).then((res) => {
      this.props.setUserId(res.userId)
      localStorage.setItem("userId", res.userId);
      TokenService.saveAuthToken(res.authToken);
      this.props.history.push("/search");
    });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="loginWrapper">
        <div className="Intro">
          <h1>Movie Night</h1>
          <h2>
            Decide what movie you and your friends want to watch together!
          </h2>
          <img src={logo} alt="family watching tv" className="loginImg" />
          <h3>
            Step 1: Create a list <br />
            Step 2: Add movies everyone wants to watch <br />
            Step 3: Copy URL link and send out to all your friends to vote on their favorite
            <br />
            <br />
            You can now see what movie everyone wants to watch!
          </h3>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => this.handleSubmit(values)}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email"></label>
                <Field
                  type="email"
                  name="email"
                  aria-label="Enter email address"
                  placeholder="Email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"></label>
                <Field
                  type="password"
                  name="password"
                  aria-label="Enter password"
                  placeholder="Password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>

              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        {error ? <p>{error}</p> : null}
        <p>test account - email: demo@demo.com & password: T@pwater1</p>
        <br />
        <p>Are you a new user? Create an account</p>
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
