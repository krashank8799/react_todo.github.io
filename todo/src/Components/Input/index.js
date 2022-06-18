import React from "react";
import style from "./input.module.css";

export default function Input(props) {
    return ( <
        input className = { style.conatiner }
        placeholder = { props.placeholder }
        value = { props.value }
        onChange = { props.onChange }
        />

    )
}