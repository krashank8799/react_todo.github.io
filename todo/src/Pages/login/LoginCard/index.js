import React from "react";
import style from "./style.module.css";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import AddIcon from "@mui/icons-material/Check";
import LoadingIcon from "@mui/material/CircularProgress";

export default function LoginCard(props) {
  const {
    onNumberChange,
    onNameChange,
    onEmailChange,
    valueEmail,
    valueNumber,
    valueName,
    onSubmit,
    isLoading,
    loginRef,
  } = props;

  return (
    <div className={style.container}>
      <h3>Enter Mobile Number </h3>{" "}
      <Input
        placeholder="Enter Your Name"
        value={valueName}
        onChange={onNameChange}
        type={"text"}
        iref={loginRef}
      />{" "}
      <Input
        placeholder="Enter Your Email Id"
        value={valueEmail}
        onChange={onEmailChange}
        type={"email"}
      />{" "}
      <Input
        placeholder="Enter Your Mobile Number"
        value={valueNumber}
        onChange={onNumberChange}
        type={"number"}
      />{" "}
      <Button onClick={onSubmit} variant="outlined">
        {" "}
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {" "}
            <AddIcon /> Submit{" "}
          </>
        )}{" "}
      </Button>
    </div>
  );
}
