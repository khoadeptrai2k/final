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


const Main = () => {
    const {auth} = useSelector(state => state)
    console.log(auth)

    // const {isAdmin} = auth
    return(
        
        <Routes>
                
                <Route exact path="/" element={ <Home/>} />
                <Route exact path="/login" element={auth.token ? <NotFound/> : <Login/>} />
                <Route exact path="/register" element={auth.token ? <NotFound/> : <Register/>} />
                <Route exact path="/forgot_password" element={auth.token  ? <NotFound/> : <ForgotPassword/>} />
                <Route exact path="/user/reset/:token" element={auth.token ? <NotFound/> : <ResetPassword/>} />
                <Route exact path="/user/activate/:activation_token" element={<ActivateEmail/>} />
                <Route exact path="/profile" element={auth.token ? <Profile/> : <NotFound/>} />
                {/* <Route exact path="/edit_user/:id" element={isAdmin ? <EditUser/> : <NotFound/>} /> */}
                
                <Route exact path="/forum" element={auth.token ? <Forum/> : <NotFound/> } />
                <Route exact path="/videoList" element={auth.token ? <VideoList/> : <NotFound/>} />
                
        </Routes>
    )
}

export default Main;