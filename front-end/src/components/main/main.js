import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from '../../pages/login'
import Register from '../../pages/register'
import ActivateEmail from '../../pages/activateEmail';
import NotFound from "../untils/NotFound/Notfound";
import Home from '../../pages/home';
import ForgotPassword from  '../../pages/Password/forgotPassword';
import ResetPassword from '../../pages/Password/resetPassword'
import Profile from "../../pages/Profile/profile";
import EditUser from '../../pages/Profile/editUser'
import Forum from '../../pages/forum';

import { useSelector } from "react-redux";


const Main = () => {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin } = auth
    return(
        
        <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={isLogged ? <NotFound/> : <Login/>} />
                <Route exact path="/register" element={isLogged ? <NotFound/> : <Register/>} />
                <Route exact path="/forgot_password" element={isLogged ? <NotFound/> : <ForgotPassword/>} />
                <Route exact path="/user/reset/:token" element={isLogged ? <NotFound/> : <ResetPassword/>} />
                <Route exact path="/user/activate/:activation_token" element={<ActivateEmail/>} />
                <Route exact path="/profile" element={isLogged ? <Profile/> : <NotFound/>} />
                <Route exact path="/edit_user/:id" element={isAdmin ? <EditUser/> : <NotFound/>} />
                
                <Route exact path="/forum" element={isLogged ? <Forum/> : <NotFound/>} />


        </Routes>
    )
}

export default Main;