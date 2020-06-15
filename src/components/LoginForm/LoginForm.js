import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-services";
import TokenService from "../../services/token-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MovieNightContext from "../../MovieNightContext";
import Config from "../../config";
import "./LoginForm.css";
const API = Config.API_ENDPOINT;

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
      password: values.password
    })
      .then((res) => {
        console.log( res)
        localStorage.setItem("userId", res.userId)
        console.log(localStorage.getItem("userId"))
        TokenService.saveAuthToken(res.authToken);
         fetch(`${API}/lists`)
           .then((listsRes) => listsRes.json())
           .then((lists) => {
             console.log(lists, res.userId, 'this is lists and res.userId')
             this.context.setLists(lists, res.userId)
            fetch(`${API}/movies`)
              .then((res) => res.json())
              .then((movies) => {
                // console.log(movies)
                this.context.setMovies(movies, this.context.lists);
                console.log(this.context)
                this.props.history.push("/search");
              });
            }  
           )
      })
      .catch((res) => {
        this.setState({ error: res.error });
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
          <h3>
            Create a list and have your friends vote on what they want to watch together
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

              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        {error ? <p>{error}</p> : null}
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
