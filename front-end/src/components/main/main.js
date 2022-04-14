import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from '../../pages/login'
import Register from '../../pages/register'
import ActivateEmail from '../../pages/activateEmail';
import NotFound from "../untils/NotFound/Notfound";
import Home from '../../pages/home';
import ForgotPassword from  '../../pages/Password/forgotPassword';
import ResetPassword from '../../pages/Password/resetPassword'
import Profile from "../../pages/profile";
// import EditUser from '../../pages/Profile/editUser'
import Forum from '../../pages/forum';
import { useSelector } from "react-redux";
import ListUser from '../../pages/listUser';
import Member  from "../../pages/member";
import ShowPosts from "../../pages/Forum/Posts/ShowPost/showPosts";
import Alert from "../alert/Alert";
import ReportAdmin from "../../pages/reportAdmin";
import Message from "../../pages/Message/message";
import MessageId from "../../pages/Message/messageId";
import SocketClient from '../../socketClient';

const Main = () => {
    const {auth} = useSelector(state => state)
    
    return(
        <div>
        <Alert/>
        {auth.token && <SocketClient/>}

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
                <Route path="/forum" element={auth.token ? <Forum/> : <Login/> } />
                <Route path="/member" element={auth.token ? <Member/> : <Login/> } />
                <Route path="/post/:id" element={<ShowPosts/>}/>
                <Route path="/report" element={auth.token ? <ReportAdmin/> : <Login/> } />
                <Route exact path="/message" element={auth.token ? <Message/> : <Login/> } />
                <Route path="/message/:id" element={auth.token ? <MessageId/> : <Login/> } />
        </Routes>
        </div>

    )
}

export default Main;