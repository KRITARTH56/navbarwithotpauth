import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row } from "react-bootstrap";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";
import "./style.css";
import Login from "./login.svg";
import { useContext } from "react";
import { Store } from "./store";

const MobileInput = (props) => {
  //initial state
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setmodal] = useState(false);
  const submitBtn = useRef("");

  const [form, setForm] = useState(false);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [timer, setTimer] = useState(30);
  const [name, setName] = useState("");

  // main syntax to use and get the username anyware
  const [{ user }, dispatch] = useContext(Store);

  const history = useHistory();

  const handler = (e) => {
    if (!isNaN(e.target.value)) {
      setNumber(e.target.value);
    }
  };

  // const namehandler = (e) => {
  //   setName(e.target.value);
  // };

  // const change = () => {
  //   dispatch({
  //     type: "Register",
  //     name: name,
  //   });
  // };

  // const getotp = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(!isSubmitting);
  // };

  const handleotp = (e, index) => {
    if (isNaN(e.value)) {
      return false;
    }
    setOtp([...otp.map((elem, id) => (index === id ? e.value : elem))]);
    if (e.nextSibling) {
      e.nextSibling.focus();
    }
  };

  if (!isSubmitting) {
    const time = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    if (timer < 0) {
      clearTimeout(time);
    }
  }
  // on click the button of submit
  // const submit = (e) => {
  //   history.push({
  //     pathname: "/userdetails",
  //   });
  //   setOtp([...otp.map((v) => "")]);
  // };

  useEffect(() => {
    setTimer(60);
  }, [isSubmitting]);

  useEffect(() => {
     setNumber("");
     setIsSubmitting(true);
     setTimer(0);
  }, [form]);

  //after submit mobile number
  const login = () => {
    console.log("No errors, login successfully");
  };

  //validate mobile number
  const validate = (values) => {
    let errors = {};
    if (!values.mobile) {
      errors.mobile = "mobile is required";
    } else if (/^[6-9]\d{9}$/.test(values.mobile)) {
      errors = {};
    } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      errors.mobile = "mobile is invalid";
    }
    return errors;
  };

  //after mobile number submitting called
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      login();
    }
  }, [errors]);

  //set re-captcha from firebase
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          // this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  //handle submit button
  const handleSubmit = (e) => {
    console.log("handleSubmit", values);
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(!isSubmitting);
    setUpRecaptcha();
    let phoneNumber = "+91" + values.mobile;
    console.log("hero");
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("hero");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  const resendOTP= (e) => {
    // console.log("handleSubmit", values);
    // e.preventDefault();
    // setErrors(validate(values));
    // setIsSubmitting(!isSubmitting);
    // setUpRecaptcha();
    let phoneNumber = "+91" + values.mobile;
    console.log("hero");
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("hero");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const resendOT= (e) => {
    
  }
    
      
  //handle otp submit button
  const onSubmitOtp = (e) => {
     //<a href="?">resend OTP</a> 
    e.preventDefault();
    let otpInput = otp.join("");
    let optConfirm = window.confirmationResult;
    console.log(otpInput);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        history.push({
          pathname: "/userdetails",
          state: { message: values.mobile },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //handle input on change value
  const handleChange = (e) => {
    e.persist();
    setNumber(e.target.value);
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const togglemodal = () => {
    setmodal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const cssstyle = {
    color: "blue",
  };

  return (
    <>
      <div className="login">
        <Button
          variant="outline-primary"
          onClick={() => setForm(!form)}
          className="start_btn"
        >
          get started
        </Button>
        {form && (
          <div className="form_container">
            <span
              className="close_btn"
              onClick={() => {
                setForm(!form);
                setOtp([...otp.map((v) => "")]);
              }}
            >
              {" "}
              &#10005;
            </span>
            {!isSubmitting && (
              <span
                onClick={() => {
                  setIsSubmitting(true);
                  setOtp([...otp.map((v) => "")]);
                }}
                className="back"
                
              >
                {" "}
                &larr;
              </span>
            )}

            <h1 className="heading">
              Take the first step, to fulfill your study abroad dreams
            </h1>
            <img className="login_img" src={Login} alt="" />

            <form onSubmit={handleSubmit} className="otp_form">
              <div
                className="input_layer"
                style={
                  number.length === 10
                    ? {
                        border: ".01rem solid green",
                        boxShadow: "0 0 0 .rem green",
                      }
                    : { border: "none" }
                }
              >
                <div id="recaptcha-container"> </div>
                <span
                  className="sign"
                  style={
                    !isSubmitting ? { color: "#7a7a7a" } : { color: "black" }
                  }
                >
                  +91
                </span>
                <input
                  type="text"
                  disabled={!isSubmitting && true}
                  style={
                    !isSubmitting ? { color: "#7a7a7a" } : { color: "black" }
                  }
                  maxLength={"10"}
                  value={number}
                  onChange={handler}
                  name="mobile"
                  value={values.text}
                  placeholder="Enter mobile number"
                  onChange={handleChange}
                  autocomplete="off"
                />
              </div>

              {isSubmitting && (
                <Button
                  ref={submitBtn}
                  onClick={handleSubmit}
                  disabled={number.length === 10 ? false : true}
                  style={
                    number.length === 10
                      ? { backgroundColor: "#443eff" }
                      : {
                          backgroundColor: "#e4e4e4",
                          color: "#c4c4c4",
                          cursor: "not-allowed",
                          fontWeight: "bold",
                        }
                  }
                  variant="primary"
                  type="submit"
                >
                  Get OTP
                </Button>
              )}
              {errors.mobile && (
                <p className="help is-danger">{errors.mobile}</p>
              )}
            </form>
            {!isSubmitting && (
              <form className="type_form">
                {!isSubmitting && (
                  <p className="resend">
                    {timer < 0 ?   <div style={{Color: "blue"}} onClick={resendOTP}>Resend OTP?</div>: `00 : ${timer}`}
                  
                  </p>
             
                )}
               
                <div className="otp_container">
                  {otp.map((elem, id) => {
                    return (
                      <input
                        disabled={isSubmitting && true}
                        value={elem}
                        onFocus={(e) => e.target.select()}
                        key={id}
                        onChange={(e) => handleotp(e.target, id)}
                        maxLength={"1"}
                        className="otp_box"
                        name="otp"
                      />
                    );
                  })}
                </div>

                <Button
                  ref={submitBtn}
                  onClick={onSubmitOtp}
                  className="btn1"
                  variant="primary"
                  type="submit"
                  style={
                    otp.join("").length === 6 && timer > 0
                      ? { backgroundColor: "#443eff" }
                      : {
                          backgroundColor: "#e4e4e4",
                          color: "#c4c4c4",
                          cursor: "not-allowed",
                          fontWeight: "bold",
                        }
                  }
                  disabled={
                    otp.join("").length === 6 && timer > 0 ? false : true
                  }
                  className="verify_btn"
                >
                  submit
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileInput;
