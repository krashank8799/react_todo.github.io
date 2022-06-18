import React from "react";
import TodoList from "./TodoList";
import Button from "../Button";

export default function UlList(props) {

    return ( <
        ul > {
            props.todoCont.map(function(todo, index) {
                return ( < > <
                    TodoList index = { index }
                    list = { todo }
                    /> <
                    Button value = "Delete"
                    onClick = { props.deleteTodo }
                    /> < / > )
            })
        } < /ul>
    )
}