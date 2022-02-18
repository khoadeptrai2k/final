import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from '../../pages/login'
import Register from '../../pages/register'
import ActivateEmail from '../../pages/activateEmail';

const Main = () => {
    return(
        <Routes>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/user/activate/:activation_token" element={<ActivateEmail/>} />

        </Routes>
    )
}

export default Main;