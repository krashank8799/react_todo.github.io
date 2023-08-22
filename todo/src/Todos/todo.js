//import style from "./todo.module.css"
import React, { useState, useEffect } from "react";
import Input from "../Components/Input/index";
import Button from "../Components/Button/index";
import UlList from "../Components/Lists/UlList";
import TodoList from "../Components/Lists/TodoList";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import style from "./todo.module.css";

export default function Todo(props) {
  const [todos, setTodos] = useState([]);
  const [ipValue, setipValue] = useState("");

  const loggedInUserName = localStorage.getItem("name");

  useEffect(function () {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080");
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ username: loggedInUserName }));
    request.addEventListener("load", function () {
      console.log(request.responseText);
      let data = request.responseText;
      let oldTodos = JSON.parse(data);
      //setTodos([...oldTodos.todo]);

      console.log(oldTodos);
      // let showTodos = []

      // for (let i = 0; i < oldTodos.length; i++) {
      //     console.log(oldTodos[i]);
      //     showTodos.push(oldTodos[i]);
      // }

      setTodos([...oldTodos]);
    });

    /*fetch("http://localhost:8080")
            .then(function(response) {
                return response.json()
            }).then(function(data) {
                console.log(data);
                let oldTodos = JSON.parse(data)
                    //setTodos([...oldTodos.todo]);

                console.log(oldTodos);
                let showTodos = []

                for (let i = 0; i < oldTodos.length; i++) {
                    console.log(oldTodos[i].todo);
                    showTodos.push(oldTodos[i].todo);
                }

                setTodos([...showTodos])
            })*/
  }, []);

  function OnInputChange(event) {
    let inputValue = event.target.value;

    setipValue(inputValue);
  }

  async function saveTodos() {
    /*let newTodos = todos.map(function(todo) {
            return todo;
        })

        newTodos.push(ipValue);

        setTodos(newTodos);*/

    await saveTodoInServer(ipValue);
    console.log("object");

    setTodos([...todos, ipValue]); //Spread Operator ES6 Feature
    setipValue("");
  }

  function saveTodoInServer(ipValue) {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/savetodo");
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        username: loggedInUserName,
        todo: ipValue,
        id: Math.floor(Math.random() * 100000),
      })
    );

    request.addEventListener("load", function () {
      console.log("data sent");
    });
    /*
            return fetch("http://localhost:8000/savetodo"), {
                method: "post",
                body: JSON.stringify({ todo: ipValue }),
                headers: {
                    "Content-Type": "application/json",
                }
            }*/
  }

  function userLogOut() {
    props.userLogout();
  }

  function deleteTodo(index) {
    return function () {
      console.log(todos, index);
      todos.splice(index, 1);
      setTodos([...todos]);
      console.log(todos);

      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:8080/deletetodo");
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify({ deleteId: index }));
      request.addEventListener("load", function () {
        console.log("deleted");
      });
    };
  }

  function editTodo(index) {
    return function () {
      var editedTask = prompt("Please Edit Your Task");
      console.log(editedTask);
      todos[index] = editedTask;
      setTodos([...todos]);
      console.log(todos);

      let request = new XMLHttpRequest();
      request.open("post", "http://localhost:8080/edittodo");
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify({ editId: index, editTodo: editedTask }));

      request.addEventListener("load", function () {
        console.log("ho gya edit");
      });
    };
  }

  return (
    <>
      <h1> Welcome {loggedInUserName} </h1> 
      <Input
        value={ipValue}
        placeholder="Add Your Task"
        onChange={OnInputChange}
      /><Button onClick={saveTodos} variant="filled">Save</Button>
      <ul>
        
        {todos.map(function (data, index) {
          return (
            <div className = {style.todo_cont}>
              <TodoList index={index} list={data} /> 
              <Button value="Delete" onClick={deleteTodo(index)}>
                <DeleteIcon /> 
              </Button> 
              <Button value="Edit" onClick={editTodo(index)}>
                <EditIcon /> 
              </Button> 
            </div>
          );
        })} 
      </ul>
      <Button onClick={userLogOut} variant="filled">
         
        LogOut 
      </Button> 
    </>
  );
}
