import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-services";
import Header from "../Header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegistrationForm.css";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
});


export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmit = (values) => {
    AuthApiService.postUser({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log(res);
        this.setState({ error: null})
        this.props.history.push("/");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <>
      <Header />
      <div className="registrationWrapper">
        <div className="Intro">
          <h1>Movie Night</h1>
          <h2>
            Decide what movie you and your friends want to watch together!
          </h2>
          <h3>
            Have you ever been stuck choosing what movie to watch with your
            friends? This app will help you create a voting list of all the
            movie choices in your group, and everyone can vote which movie they
            want to watch!
          </h3>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={RegistrationSchema}
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

              <button type="submit" className="btn btn-primary btn-block">
                Create an Account
              </button>
            </Form>
          )}
        </Formik>
        {error ? <p>{error}</p> : null}
        <p>After creating an account, please log in with your credentials</p>
      </div>
      </p>
      </>
    );
  }
}
