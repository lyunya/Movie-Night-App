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
        this.setState({ error: null });
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
              Step 1: Create a list <br />
              Step 2: Add movies everyone wants to watch <br />
              Step 3: Copy the Movie List URL link from your browser and send it out to all your friends to vote on
              their favorite <br />
              <br />
              You can now see what movie everyone wants to watch!
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

                <button type="submit" className="create-btn">
                  Create an Account
                </button>
              </Form>
            )}
          </Formik>
          {error ? <p>{error}</p> : null}
          <p>After creating an account, please log in with your credentials</p>
        </div>
      </>
    );
  }
}
