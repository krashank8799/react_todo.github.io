import React from "react";
//import Button from "../Button";

export default function TodoList(props) {
  // console.log("todo")

  return <li key={props.index}> {props.list} </li>;
}
