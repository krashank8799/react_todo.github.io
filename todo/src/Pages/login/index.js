import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";

import LoginCard from "./LoginCard";

import OtpCard from "./otpcard";
//import { OtpSubmit } from "../../api/auth";

export default function LoginPage(props) {
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Ref = useRef(null);

  const navigate = useNavigate();

  // useEffect(function() {
  //     Ref.current.focus();
  // }, [])

  function onOtpChange(event) {
    setOtp(event.target.value);
    console.log(otp);
  }

  function onUserEmailChange(event) {
    setUserEmail(event.target.value);
    console.log(userEmail);
  }

  function onMobileNumberChange(event) {
    setMobileNumber(event.target.value);
    console.log(mobileNumber);
  }

  function onUserNameChange(event) {
    setuserName(event.target.value);
    console.log(userName);
  }

  function OtpRequest(userName, userEmail) {
    let details = {
      userName: userName,
      userEmail: userEmail,
    };
    console.log(details);

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/savedetails");
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        userName: userName,
        userEmail: userEmail,
      })
    );

    request.addEventListener("load", function () {
      console.log("Details Saved");
    });

    /*return fetch("http://localhost:8080/savedetails"), {
            method: "POST",
            body: JSON.stringify({ userName: userName, mobileNumber: mobileNumber }),
            headers: {
                "Content-Type": "application/json",
            }

        }*/
  }

  async function onSubmit() {
    setIsLoading(true);

    try {
      await OtpRequest(userName, userEmail);
      setIsOtpRequested(true);
      setIsLoading(false);
    } catch (err) {
      alert("Something went wrong!!");
      setIsLoading(false);
    }
  }

  function OtpSubmit(otp) {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/checkotp");
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        otp: otp,
      })
    );

    request.addEventListener("load", function () {
      console.log("otp sent");
      console.log(request.responseText);
      var response = JSON.parse(request.responseText);
      if (response === "correct Otp") {
        localStorage.setItem("name", userName);
        setIsLoading(false);
        props.setAuth();
      } else if (request.responseText === "404") {
        console.log("wrong");
        setIsLoading(false);
        alert("Wrong Otp");
        //navigate("/", { replace: true })
      } else {
        alert("wrong otp");
        setIsLoading(false);
      }
    });
  }

  async function onOtpSubmit() {
    try {
      setIsLoading(true);
      await OtpSubmit(otp);
      /*localStorage.setItem("token", "fake")
            setIsLoading(false);
            props.setAuth()*/
      //navigate("/", { replace: true })
    } catch (err) {
      alert("Something went wrong!!");
      setIsLoading(false);
    }
  }
  return (
    <div className={style.container}>
      {isOtpRequested ? (
        <OtpCard
          onOtpSubmit={onOtpSubmit}
          isLoading={isLoading}
          value={otp}
          onChange={onOtpChange}
          otpRef={Ref}
        />
      ) : (
        <LoginCard
          onNumberChange={onMobileNumberChange}
          onNameChange={onUserNameChange}
          onEmailChange={onUserEmailChange}
          valueEmail={userEmail}
          valueNumber={mobileNumber}
          valueName={userName}
          onSubmit={onSubmit}
          isLoading={isLoading}
          loginRef={Ref}
        />
      )}{" "}
    </div>
  );
}
