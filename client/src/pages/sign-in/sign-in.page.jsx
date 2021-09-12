import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik } from "formik";

import "./sign-in.styles.scss";

import { postUserDataToTheServer } from '../../redux/user/user.actions';

import ImgStudent from '../../graphics/pages-content/sign-in/avatar-student.png';
import ImgEducator from '../../graphics/pages-content/sign-in/avatar-educator.png';

const SignIn = (props) => {

  const { 
		// component: Component,
		// privateRoute,
		// path,
		processing,
		dataFetched,
    status,
		// user,
		error,
    postUserData,
		...rest
	} = props;
	
	console.log(
		'%c PublicRoute component, { ...props } ===> ',
		'color: orangered; font-weight: bold;',
		{ ...props }
	);

  /**
   * Single state hook useState for all the state properties
   */
  const [fullState, setFullState] = React.useState({
    submitSuccess: false,
    submitError: false,
    errorMessage: "",
    role: props.location?.state
      ? props.location.state.role || "student"
      : "student",
  });

  /**
   * Redirect on successfull submission
   */
  React.useEffect(() => {
    if (fullState.submitSuccess) {
    //   props.history.push('/profile');
    }
  }, [fullState.submitSuccess]);

  const role = props.location?.state
    ? props.location.state.role || "student"
    : "student";

  const signInForm = () => {
    return (
      <>
        <Formik
          initialValues={{
            role,
            email: "",
            password: "",
            remember: false,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Please provide your valid email address";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please provide valid email address";
            }

            if (!values.password) {
              errors.password =
                "Please provide a password at least 8 characters";
            } else if (values.password.length < 1) {
              //for debugging, change in production
              // if (values.password.length < 8) {
              errors.password = "Your password should be at least 8 characters";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);


            postUserData('signin', values)
            .then((res) => {
              console.log(
                '%c sign-in.page onSubmit, status ===> ',
                'color: yellowgreen; font-weight: bold;',
                status
              );
              setFullState({
                ...fullState,
                submitSuccess: true,
                submitError: false,
                errorMessage: "",
              });
              props.history.push(`/profile`);

            })
            .catch((e) => {
              setFullState({
                ...fullState,
                submitSuccess: false,
                submitError: true,
                errorMessage: error.message,
              });
            });

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form className="sign-in__form" onSubmit={handleSubmit}>
              <>
                <div className="sign-in__role">
                  <input
                    type="radio"
                    name="role"
                    id="student"
                    className="sign-in__role-radio"
                    onChange={() => {
                      setFieldValue("role", "student");
                      setFullState({
                        ...fullState,
                        role: "student",
                      });
                    }}
                    value="student"
                    checked={values.role === "student"}
                  />
                  <label
                    htmlFor="student"
                    className="sign-in__role-label sign-in__role-label--student"
                  >
                    Student
                  </label>
                  <input
                    type="radio"
                    name="role"
                    id="educator"
                    className="sign-in__role-radio"
                    onChange={() => {
                      setFieldValue("role", "educator");
                      setFullState({
                        ...fullState,
                        role: "educator",
                      });
                    }}
                    value="educator"
                    checked={values.role === "educator"}
                  />
                  <label
                    htmlFor="educator"
                    className="sign-in__role-label sign-in__role-label--educator"
                  >
                    Educator
                  </label>
                </div>
                {
                  <p className="sign-in__error-message">
                    {errors.surname && touched.surname ? errors.surname : ""}
                  </p>
                }
              </>
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`sign-in__input${
                    errors.email && touched.email ? " form-input--error" : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <p className="sign-in__error-message">{errors.email}</p>
                ) : null}
              </>
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`sign-in__input${
                    errors.password && touched.password
                      ? " form-input--error"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <p className="sign-in__error-message">{errors.password}</p>
                ) : null}
              </>
              <div className="sign-in__checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="sign-in__checkbox"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.remember}
                />
                <label htmlFor="remember" className="sign-in__checkbox-label">
                  Remember me
                </label>
              </div>
              <>
                <p className="sign-in__error-message">
                  {fullState.submitError ? fullState.errorMessage : ""}
                </p>
                <input
                  type="submit"
                  value="SIGN IN"
                  className={`btn btn--signin btn--dt ${
                    values.role === "educator"
                      ? "btn--primary "
                      : "btn--tertiary "
                  }`}
                />
              </>
              <Link
                to={{
                  pathname: "/signin",
                  state: {
                    role: fullState.role,
                  },
                }}
                className={`sign-in__forgot sign-in__link sign-in__link--${fullState.role}`}
              >
                <p className="">
                  Forgot Password?
                </p>
              </Link>
              <hr className={`sign-in__hr sign-in__hr--${fullState.role}`} />
              <p className="sign-in__redirect-sign-up">
                Don't have an account?{" "}
                <Link
                  to={{
                    pathname: "/signup",
                    state: {
                      role: fullState.role,
                    },
                  }}
                  className={`sign-in__link 
                            sign-in__link--${fullState.role}`}
                >
                  Sign Up.
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </>
    );
  };

  return (
    <main className="sign-in container">
      <img
        src={
          fullState.role === "student" ?
          `http://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/sign-in/avatar-student.png` :
          `http://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/sign-in/avatar-educator.png`
        }
        alt={`${fullState.role} avatar`}
        className={`sign-in__logo sign-in__logo--${fullState.role}`}
      />
      <h2 className="sign-in__heading heading-secondary heading-secondary--uppercase">
        {`Sign in`}
      </h2>
      {signInForm()}
    </main>
  );
};

const mapReduxStateToProps = state => ({
	processing: state.auth.processing,
	dataFetched: state.auth.dataFetched,
  status: state.auth.status,
	error: state.auth.error,
});

const mapReduxDispatchToProps = dispatch => ({
	postUserData: (route, values) => dispatch(postUserDataToTheServer(route, values)),
});

export default connect(
	mapReduxStateToProps,
  mapReduxDispatchToProps,
)(SignIn);
