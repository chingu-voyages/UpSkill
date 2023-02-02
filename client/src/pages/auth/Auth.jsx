import React, { useEffect, useRef } from "react";
import { BsGoogle, BsLinkedin } from "react-icons/bs";
import { TfiFacebook } from "react-icons/tfi";
import loginImg from "../../assets/signup/girl_at_computer.jpg";
import ButtonPrimary from "../../components/ButtonPrimary";
import Input from "../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  ifAuthenticated,
  login,
} from "../../features/login-logout/login-logout-slice";
import {
  setErrorSignup,
  setIsSignup,
  signup,
} from "../../features/signup/signup-slice";
import { useNavigate } from "react-router-dom";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialLinkedin,
} from "reactjs-social-login";
import { authZero, setError } from "../../features/auth0/auth0-slice";

/**
 * this is the interface for the login and sign up
 * @return Jsx
 */
function Auth() {
  /**
   * here we'll get the state from redux,
   */
  const dataRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };
  const signupState = useSelector((state) => state.signUp);
  const isSignUp = signupState.isSignup;
  const auth = useSelector((state) => state.auth);
  const auth0 = useSelector((state) => state.auth0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (signupState.registered) {
      navigate("/post-signup");
      return;
    }
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, signupState.registered]);
  /**
   * this function processes sending data
   * that the user has to enter manually
   *
   * @param {*} e event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /**
     * to get the value of the input
     * eg: dataRef.email.current.value
     */
    if (isSignUp) {
      if (
        dataRef.password.current.value === "" ||
        dataRef.email.current.value === "" ||
        dataRef.firstName.current.value === "" ||
        dataRef.lastName.current.value === ""
      ) {
        dispatch(setErrorSignup("Every field must have a value"));
        return;
      }
      if (
        dataRef.password.current.value !== dataRef.confirmPassword.current.value
      ) {
        dispatch(setErrorSignup("password should equal to re-type password"));
        return;
      }
      await dispatch(
        signup({
          firstName: dataRef.firstName.current.value,
          lastName: dataRef.lastName.current.value,
          email: dataRef.email.current.value,
          password: dataRef.password.current.value,
        })
      );
      await dispatch(ifAuthenticated());
    } else {
      if (
        dataRef.password.current.value === "" ||
        dataRef.email.current.value === ""
      ) {
        return;
      }
      await dispatch(
        login({
          email: dataRef.email.current.value,
          password: dataRef.password.current.value,
        })
      );
    }
  };

  const googleAuth = async (res) => {
    const userData = res?.data;
    await dispatch(
      authZero({
        profilePic: userData.picture,
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
        password: userData.sub,
      })
    );
    await dispatch(ifAuthenticated());
  };

  const facebookAuth = async (res) => {
    const userData = res?.data;
    await dispatch(
      authZero({
        profilePic: userData.picture.data.url,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.id,
        password: userData.userID,
      })
    );
    await dispatch(ifAuthenticated());
  };

  const linkedinAuth = async (res) => {
    const userData = res?.data;
    await dispatch(
      authZero({
        firstName: userData.localizedFirstName,
        lastName: userData.localizedLastName,
        email: userData.id,
        password: userData.id,
      })
    );
    await dispatch(ifAuthenticated());
  };

  return (
    <div className="container h-full flex justify-center content-center items-center mx-auto text-center">
      <div className="md:grid md:grid-cols-2">
        <div className="md:flex-auto md:content-center md:justify-center ">
          <div className="">
            <img
              src={loginImg}
              alt="..."
              width={741}
              height={541}
              className="hidden md:block md:w-full"
            />
            <h1 className="p-4 m-4 text-primary font-title font-bold text-3xl">
              {isSignUp ? "Join the skill sharing revolution" : "Welcome Back!"}
            </h1>
          </div>
        </div>
        <div className="flex justify-center content-center items-center">
          <div
            className="bg-ivory-100 m-4 p-4 rounded-lg drop-shadow-lg md:h-full md:w-3/4 
          md:flex md:justify-center md:content-center md:items-center"
          >
            <div className="md:w-full md:h-full">
              <h1
                className={`text-grotto-100 font-sans ${
                  !isSignUp ? "md:text-4xl md:h-16 md:mt-4" : "text-2xl"
                }`}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </h1>
              {(auth.error || signupState.error || auth0.error) && (
                <span className="text-red-600">
                  {" "}
                  {auth.error || signupState.error || auth0.error}{" "}
                </span>
              )}
              <form action="" onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="flex ">
                    <Input
                      type="text"
                      name="firstName"
                      classStyle={`flex-auto`}
                      inputRef={dataRef.firstName}
                    >
                      First Name
                    </Input>
                    <Input
                      type="text"
                      name="LastName"
                      classStyle="flex-auto"
                      inputRef={dataRef.lastName}
                    >
                      Last Name
                    </Input>
                  </div>
                )}
                <Input
                  type="email"
                  name="email"
                  classStyle={"md:mb-8"}
                  inputRef={dataRef.email}
                >
                  Email
                </Input>
                <Input
                  type="password"
                  name="password"
                  classStyle={"md:mb-8"}
                  inputRef={dataRef.password}
                >
                  Password
                </Input>

                {isSignUp && (
                  <Input
                    type="password"
                    name="confirmPassword"
                    inputRef={dataRef.confirmPassword}
                  >
                    Re-type password
                  </Input>
                )}
                <br />
                <ButtonPrimary type={"submit"}>
                  {isSignUp ? "Sign up" : "Login"}
                </ButtonPrimary>
              </form>
              <br />
              <p className="font-medium text-ivory-200">
                {isSignUp
                  ? "Already have an account"
                  : "Don't have an account yet?"}{" "}
                <span
                  className="cursor-pointer hover:text-grotto-100"
                  onClick={() => {
                    dispatch(setErrorSignup(null));
                    dispatch(setIsSignup());
                  }}
                >
                  Click here!
                </span>{" "}
              </p>
              <div className={`${!isSignUp && "md:h-14"}`}></div>
              <br />
              <div className="flex justify-center">
                <p className="font-medium text-ivory-200 w-1/4 rounded-full bg-ivory-100 z-10 ">
                  OR
                </p>
              </div>
              <div className="relative">
                <hr className="border-ivory-300 surlignage" />
              </div>
              <div className={`${!isSignUp && "md:h-12"}`}></div>
              <br />
              <div className="flex justify-center">
                <div className="flex flex-row justify-between w-3/4">
                  <LoginSocialGoogle
                    client_id={import.meta.env.VITE_GOOGLECLIENTID || ""}
                    scope="profile"
                    onResolve={googleAuth}
                    onReject={(err) => dispatch(setError(err))}
                    redirect_uri="http://localhost:5173/auth"
                    cookie_policy="single_host_orgin"
                  >
                    <BsGoogle
                      color="grotto-100"
                      size={50}
                      className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    />
                  </LoginSocialGoogle>
                  <LoginSocialFacebook
                    client_id={import.meta.env.VITE_FACEBOOK_APP_ID || ""}
                    scope="email"
                    onResolve={facebookAuth}
                    onReject={(err) => dispatch(setError(err))}
                    cookie_policy="single_host_orgin"
                  >
                    <TfiFacebook
                      color="grotto-100"
                      size={50}
                      className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    />
                  </LoginSocialFacebook>
                  <LoginSocialLinkedin
                    client_secret={
                      import.meta.env.VITE_SECRET_CLIENT_LINKEDIN || ""
                    }
                    client_id={import.meta.env.VITE_LINKEDIN_ID || ""}
                    onResolve={linkedinAuth}
                    onReject={(err) => dispatch(setError(err))}
                    redirect_uri="http://localhost:5173/auth"
                    cookie_policy="single_host_orgin"
                  >
                    <BsLinkedin
                      size={50}
                      className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    />
                  </LoginSocialLinkedin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
