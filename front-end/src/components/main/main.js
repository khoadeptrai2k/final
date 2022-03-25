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
// import EditUser from '../../pages/Profile/editUser'
import Forum from '../../pages/forum';
import { useSelector } from "react-redux";
import VideoList from '../../pages/videoList';
import ListUser from '../../pages/listUser';


const Main = () => {
    const {auth} = useSelector(state => state)

    return(
        
        <Routes>
                <Route exact path="/" element={ <Home/>} />
                <Route path="/login" element={auth.token ? <NotFound/> : <Login/>} />
                <Route path="/register" element={auth.token ? <NotFound/> : <Register/>} />
                <Route path="/forgot_password" element={auth.token  ? <NotFound/> : <ForgotPassword/>} />
                <Route path="/user/reset/:token" element={auth.token ? <NotFound/> : <ResetPassword/>} />
                <Route path="/user/activate/:activation_token" element={<ActivateEmail/>} />
                <Route path="/infor/:id" element={<Profile/>} />
                {/* <Route exact path="/edit_user/:id" element={isAdmin ? <EditUser/> : <NotFound/>} /> */}
                <Route path="/listUser" element={<ListUser/>} />
                <Route path="/forum" element={auth.token ? <Forum/> : <NotFound/> } />
                <Route path="/videoList" element={auth.token ? <VideoList/> : <NotFound/>} />
        </Routes>
    )
}

export default Main;