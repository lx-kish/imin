import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Formik } from "formik";

import "./sign-up.styles.scss";

import config from "../../axios.config";

import ImgStudent from "../../graphics/pages-content/sign-up/IMIN-purple.png";
import ImgEducator from "../../graphics/pages-content/sign-up/IMIN-pink.png";

/**
 * Component Sign-up let user to create an account in the system.
 * System can accept 3 different types of users:
 * - administrators,
 * - educators,
 * - students
 *
 * Contains user form (separate for each type of users) to collect data
 * about user and send it to the server. After sending server is saving data
 * into the DB, and signing in user at the same time (@TODO expand to sending
 * confirmation via registered email with unique link, and authorize user by
 * clicking that unique link).
 *
 * On success gets response from the server, containing:
 * a) cookie with a session JWT for 'signed in' state;
 * b) json with keys 'status' set to 'success', 'token' set to jwt value,
 * and 'data', containing object with new user data, including unique user ID
 * in the database.
 * After getting success response document redirects user to the profile page.
 * 
 * On error returns error object contains error code. Error code then displays
 * in the form over the submit button.
 *
 * @param {*} props
 */
const SignUp = (props) => {
  /**
   * Single state hook useState for all the state properties
   */
  const [fullState, setFullState] = React.useState({
    submitSuccess: false,
    submitError: false,
    errorMessage: "",
  });

  /**
   * Redirect on successfull submission
   */
  React.useEffect(() => {
    if (fullState.submitSuccess) {
      // props.history.push('/profile');
    }
  }, [fullState.submitSuccess]);

  const role = props.location?.state
    ? props.location.state.role || "student"
    : "student";

  const signUpForm = () => {
    return (
      <div className="sign-up__form-box">
        <h2 className="sign-up__heading sign-up__heading--dt heading-secondary heading-secondary--uppercase">
          {`${role === "educator" ? "Educator" : "Student"} Sign Up`}
        </h2>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            phone: "",
            email: "",
            password: "",
            passwordConfirm: "",
            company: "",
            website: "",
            description: "",
            termsAndConditionsRead: false,
            role: role,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Please provide your First Name";
            } else if (!/^[A-Za-z]+$/i.test(values.name)) {
              errors.name = "Please provide valid First Name";
            }

            if (!values.surname) {
              errors.surname = "Please provide your Last Name";
            } else if (!/^[A-Za-z]+$/i.test(values.surname)) {
              errors.surname = "Please provide valid Last Name";
            }

            if (!values.email) {
              errors.email = "Please provide your valid email address";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please provide valid email address";
            }

            // if (!values.phone) {
            //     errors.email = 'Please provide your valid email address';
            // } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //     errors.email = 'Please provide valid email address';
            // }

            if (!values.password) {
              errors.password =
                "Please provide a password at least 8 characters";
            } else if (values.password.length < 1) {
              //for debugging, change in production
              // if (values.password.length < 8) {
              errors.password = "Your password should be at least 8 characters";
            }

            if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = "Please repeat the password";
            }
            if (!values.termsAndConditionsRead) {
              errors.termsAndConditionsRead =
                "To continue you should accept Terms and Conditions";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            //set setSubmitting Formik flag to true to prevent double sending form
            setSubmitting(true);

            //set the role sending to the server from the form
            values.role = role;

            // send request containing new user data from the form to the server
            axios
              .post(`/api/users/signup`, values, config)

              //getting respond from the server
              .then((res) => {
                console.log("sign up doc, res =====> ", res);

                setFullState({
                  ...fullState,
                  submitSuccess: true,
                  submitError: false,
                  errorMessage: "",
                });

                //reset form fields

                //redirect to the profile page with the newly registered user
                props.history.push(`/profile`);
                // props.history.push(`/profile`, { role: res.data.data.role });
              })

              //error handler for unknown errors
              .catch((error) => {
                console.log("sign up doc, error =====> ", error.response);

                // resetForm();
                setFullState({
                  ...fullState,
                  submitSuccess: false,
                  submitError: true,
                  errorMessage: error.message,
                });
              });

            //setting formik setSubmitting flag to false
            setSubmitting(false);
          }}
          // resetForm = {(values, {resetForm}) => {values: ''}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            isSubmitting,
          }) => (
            <form className="sign-up__form " onSubmit={handleSubmit}>
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  className={`sign-up__input${
                    errors.name && touched.name ? " sign-up__input--error" : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {
                  <p className="sign-up__input--error-message">
                    {errors.name && touched.name ? errors.name : ""}
                  </p>
                }
              </>
              <>
                <input
                  type="text"
                  name="surname"
                  placeholder="Last Name"
                  className={`sign-up__input${
                    errors.surname && touched.surname
                      ? " sign-up__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                />
                {
                  <p className="sign-up__input--error-message">
                    {errors.surname && touched.surname ? errors.surname : ""}
                  </p>
                }
              </>
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`sign-up__input${
                    errors.email && touched.email
                      ? " sign-up__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <p className="sign-up__input--error-message">
                    {errors.email}
                  </p>
                ) : null}
              </>
              <>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact No."
                  className={`sign-up__input${
                    errors.phone && touched.phone
                      ? " sign-up__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <p className="sign-up__input--error-message">
                    {errors.phone}
                  </p>
                ) : null}
              </>
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`sign-up__input${
                    errors.password && touched.password
                      ? " sign-up__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <p className="sign-up__input--error-message">
                    {errors.password}
                  </p>
                ) : null}
              </>
              <>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  className={`sign-up__input${
                    errors.passwordConfirm && touched.passwordConfirm
                      ? " sign-up__input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                />
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <p className="sign-up__input--error-message">
                    {errors.passwordConfirm}
                  </p>
                ) : null}
              </>
              {role === "educator" ? (
                <>
                  <>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      className={`sign-up__input${
                        errors.company && touched.company
                          ? " sign-up__input--error"
                          : ""
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.company}
                    />
                    {errors.company && touched.company ? (
                      <p className="sign-up__input--error-message">
                        {errors.company}
                      </p>
                    ) : null}
                  </>
                  <>
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      className={`sign-up__input${
                        errors.company && touched.company
                          ? " sign-up__input--error"
                          : ""
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.website}
                    />
                  </>
                  <>
                    <label
                      htmlFor="description"
                      className="sign-up__description-label"
                    >
                      What makes you passionate about working with I’m In?
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      cols="35"
                      className={`sign-up__description${
                        errors.company && touched.company
                          ? " sign-up__input--error"
                          : ""
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </>
                </>
              ) : null}
              <>
                <div className="sign-up__checkbox-group">
                  <input
                    type="checkbox"
                    id="termsAndConditionsRead"
                    name="termsAndConditionsRead"
                    className="sign-up__checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.termsAndConditionsRead}
                  />
                  <label
                    htmlFor="termsAndConditionsRead"
                    className="sign-up__checkbox-label"
                  >
                    I have agreed to the{" "}
                    <Link
                      to={"/terms"}
                      className={`sign-up__link 
                            sign-up__link--${role}`}
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                {errors.termsAndConditionsRead &&
                touched.termsAndConditionsRead ? (
                  <p className="sign-up__input--error-message sign-up__checkbox-error">
                    {errors.termsAndConditionsRead}
                  </p>
                ) : null}
              </>
              <>
                <p className="sign-up__input--error-message">
                  {fullState.submitError ? fullState.errorMessage : ""}
                </p>
                <input
                  type="submit"
                  value="SIGN UP"
                  className={`btn btn--signin btn--dt ${
                    role === "educator" ? "btn--primary " : "btn--tertiary "
                  }`}
                />
              </>
              <hr className={`sign-up__hr sign-up__hr--${role}`} />
              <p className="sign-up__redirect-sign-in">
                Already have an account?{" "}
                <Link
                  to={{
                    pathname: "/signin",
                    state: {
                      role,
                      // role: role === "educator" ? "educator" : "student",
                    },
                  }}
                  className={`sign-up__link 
                            sign-up__link--${role}`}
                  // className="sign-up__redirect-sign-in--link"
                >
                  Sign in.
                </Link>
              </p>
              <Link
                to={{
                  pathname: "/signup",
                  state: {
                    // role,
                    role: role === "educator" ? "student" : "educator",
                  },
                }}
                className={`sign-up__link sign-up__link--${role}`}
                onClick={resetForm}
              >
                <p className="sign-up__toggle">
                  {`Sign up as ${
                    role === "educator" ? "a student" : "an educator"
                  }?`}
                </p>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    );
  };

  return (
    <main className={"sign-up"}>
      <div className={`sign-up__background sign-up__background--${role}`}>
        {/* <div className={`sign-up__logo sign-up__logo--${role}`}></div> */}
        <img
          src={role === "student" ? ImgStudent : ImgEducator}
          alt={`${role} logo`}
          className={`sign-up__logo`}
        />
        <h2 className="sign-up__heading sign-up__heading--mb color-white">
          {`${role} Sign Up`}
          {/* {`${role === "educator" ? "Educator" : "Student"} Sign Up`} */}
        </h2>
        {/* <div className="sign-up__heading--mb">
          <h2 className="sign-up__heading color-white">
            {`${role === "educator" ? "Educator" : "Student"}`}
          </h2>
          <h2 className="sign-up__heading color-white">
            {`Sign Up`}
          </h2>
        </div> */}
      </div>
      {signUpForm()}
    </main>
  );
};

export default SignUp;
