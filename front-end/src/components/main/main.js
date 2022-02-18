import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from '../../pages/login'
import Register from '../../pages/register'
import ActivateEmail from '../../pages/activateEmail';
import NotFound from "../untils/NotFound/Notfound";

import Home from '../../pages/home'

import { useSelector } from "react-redux";

const Main = () => {
    const auth = useSelector(state => state.auth)
    const {isLogged } = auth
    return(
        
        <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={isLogged ? <NotFound/> : <Login/>} />
                <Route exact path="/register" element={isLogged ? <NotFound/> : <Register/>} />
                <Route exact path="/user/activate/:activation_token" element={<ActivateEmail/>} />
        </Routes>
    )
}

export default Main;