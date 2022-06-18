import React from "react";
import style from "./button.module.css"

export default function Button(props) {

    let buttonType = props.variant ? style[props.variant] : style.plain;

    return ( < button onClick = { props.onClick }
        className = { `${style.button} ${buttonType}` } > { props.children } < /button> );
    }