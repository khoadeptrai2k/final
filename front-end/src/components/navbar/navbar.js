import React from "react";
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink } from './navbarElements';


const Navbar = () => {
    return(
        <Nav>
            <div className="logo">
                <h1><NavLink to="/">STU-HOME</NavLink></h1>
            </div>
            <Bars />
            <NavMenu>
                <NavLink to='/home' activeStyle>
                    Home
                </NavLink>
                <NavLink to='/about' activeStyle>
                    About
                </NavLink>
                <NavLink to='/contact' activeStyle>
                    Contact
                </NavLink>
            </NavMenu>
            
            <NavBtn>
                <NavBtnLink to='/login'>Sign In</NavBtnLink>
                <NavBtnLink to='/register'>Register</NavBtnLink>
            </NavBtn>
        </Nav>
    );
};

export default Navbar;