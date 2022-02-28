import React from "react";
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    Img, 
    Li,
    DropItem} from './navbarElements';
import {useSelector} from 'react-redux'
import axios from 'axios'    
// import SideBar from '../sidebar/sidebar';


const Navbar = () => {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href ="/"
        } catch (err) {
            window.location.href ="/"
        }
    }

    const userLink = () => {
        return <NavMenu>
                <NavLink to="#" className="avatar">
                    <Img  src={user.avatar} alt=""/> {user.name}
                </NavLink>                
                <DropItem>
                    <Li><NavLink to="/profile">Profile</NavLink></Li>
                    <Li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></Li>
                </DropItem>
            </NavMenu>
    }

    const transFrom = {
        transform: isLogged ? "translateY(-5px)" : 0
    }


    return(
        <Nav>
            {/* <SideBar/> */}
            <NavMenu className="logo">
                <h1><NavLink to="/">STU-HOME</NavLink></h1>
            </NavMenu>
            <Bars />
            <NavMenu>
                <NavLink to='/' activeStyle>
                    Home
                </NavLink>
                <NavLink to='/about' activeStyle>
                    About
                </NavLink>
                <NavLink to='/contact' activeStyle>
                    Contact
                </NavLink>
                <NavLink to='/forum' activeStyle>
                    Forum
                </NavLink>
                
            </NavMenu>
            <NavMenu style={transFrom}>
            {
                    isLogged
                    ? userLink()
                    :
                <NavBtn>
                    <NavBtnLink to='/login'>Sign In</NavBtnLink>
                    <NavBtnLink to='/register'>Register</NavBtnLink>
                </NavBtn>
                
            }
            </NavMenu>
        </Nav>       
    );
};

export default Navbar;