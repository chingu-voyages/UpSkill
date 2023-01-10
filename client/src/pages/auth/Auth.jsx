import React, { useRef, useState } from "react";
import { BsGoogle, BsLinkedin } from "react-icons/bs";
import { TfiFacebook } from "react-icons/tfi";
import loginImg from "../../assets/signup/girl_at_computer.jpg";
import ButtonPrimary from "../../components/ButtonPrimary";
import Input from "../../components/Input";
import "./index.css";

/**
 * this is the interface for the login and sign up
 * @return Jsx
 */
function Auth() {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const [dataForm, setDataForm] = useState(initialData);
  const dataRef = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };
  const googleAuth = () => {
    //google authentification
  };

  const facebookAuth = () => {
    //facebook authentification
  };

  const linkedInAuth = () => {
    //linkedIn authentification
  };

  /**
   * this function processes sending data
   * that the user has to enter manually
   *
   * @param {*} e event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * to get the value of the input
     * eg: dataRef.email.current.value
     */
    if (isSignUp) {
      //handle the post methode as sign up here
      //redirect to postSignUpQ/A
    } else {
      //handle the post methode as sign in(login)
      //redirect to dashbord
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
        <div className="flex  justify-center content-center items-center">
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
                  email
                </Input>
                <Input
                  type="password"
                  name="password"
                  classStyle={"md:mb-8"}
                  inputRef={dataRef.password}
                >
                  password
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
                  onClick={() => setIsSignUp((p) => !p)}
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
                    className="p-2 fill-grotto-100 border border-ivory-200 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    onClick={googleAuth}
                  />
                  <TfiFacebook
                    color="grotto-100"
                    size={50}
                    className="p-2 fill-grotto-100 border border-ivory-200 rounded 
              drop-shadow-lg hover:fill-white hover:bg-grotto-100"
                    onClick={facebookAuth}
                  />
                  <BsLinkedin
                    size={50}
                    className="p-2 fill-grotto-100 border border-ivory-200 rounded 
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
