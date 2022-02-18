import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from '../../pages/login'
import Register from '../../pages/register'

const Main = () => {
    return(
        <Routes>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
        </Routes>
    )
}

export default Main;