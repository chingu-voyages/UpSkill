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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleAuth = () => {
    //google authentification
  };

  const facebookAuth = () => {
    //facebook authentification
  };

  const linkedInAuth = () => {
    //linkedIn authentification
  };

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
      dispatch(
        signup({
          firstName: dataRef.firstName.current.value,
          lastName: dataRef.lastName.current.value,
          email: dataRef.email.current.value,
          password: dataRef.password.current.value,
        })
      );
      dispatch(ifAuthenticated());
    } else {
      if (
        dataRef.password.current.value === "" ||
        dataRef.email.current.value === ""
      ) {
        return;
      }
      dispatch(
        login({
          email: dataRef.email.current.value,
          password: dataRef.password.current.value,
        })
      );
    }
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
              {(auth.error || signupState.error) && (
                <span className="text-red-600">
                  {" "}
                  {auth.error || signupState.error}{" "}
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
                  <BsGoogle
                    color="grotto-100"
                    size={50}
                    className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    onClick={googleAuth}
                  />
                  <TfiFacebook
                    color="grotto-100"
                    size={50}
                    className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    onClick={facebookAuth}
                  />
                  <BsLinkedin
                    size={50}
                    className="p-2 fill-grotto-100 border border-ivory-300 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    onClick={linkedInAuth}
                  />
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
