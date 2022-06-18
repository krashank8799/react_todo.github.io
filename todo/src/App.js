import './App.css';
import Home from './Pages/home';
import React, { useState, useEffect } from 'react';
import Todo from "./Todos/todo"
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from "./Pages/login/index"
import Loading from "@mui/material/CircularProgress";




export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoggedInCheck, setIsLoggedInCheck] = useState(false);


    const navigate = useNavigate();



    useEffect(function() {
        const token = localStorage.getItem("name")

        if (token) {
            setIsLoggedIn(true);
        }

        setIsLoggedInCheck(true);
    }, [])

    function setAuth() {
        setIsLoggedIn(true)
    }

    function loggedOut() {
        localStorage.clear()
        setIsLoggedIn(false);
        navigate("/", { replace: true })
    }

    let loggedInUserName = localStorage.getItem("name");

    let content = "";

    if (isLoggedInCheck) {
        if (isLoggedIn) {
            content = ( <
                >
                <
                Routes >
                <
                Route path = "/"
                element = { < Todo
                    userName = { loggedInUserName }
                    userLogout = { loggedOut }

                    / > } / >
                    <
                    /
                    Routes > < / > )
                }
                else {
                    content = <
                        LoginPage setAuth = { setAuth }
                    / >
                }
            }
            else {
                content = < Loading / >
            }




            return <
                >
                { content } < />

        }