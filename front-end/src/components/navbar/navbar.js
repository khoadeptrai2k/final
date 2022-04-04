import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Img,
  Li,
  DropItem,
} from "./navbarElements";
import { useSelector } from "react-redux";
import { postData } from "../../redux/api/authAPI";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("firstLogin");
      await postData("logout");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const handleSHowHide = () =>{
    if(menu === false){
      return setMenu(true)
    }
    return setMenu(false)
  
}
console.log(menu,"checkl")

  const userLink = () => {
    return (
      <NavMenu>
        <NavLink to="#" className="avatar">
          <div onClick={handleSHowHide}>
            <Img
              src={auth.userHeader.avatar}
              alt=""
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <span className="hello"> Hello, {auth.userHeader.name}</span>{" "}
          </div>

          <DropItem aria-labelledby="dropdownMenuLink" style={menu?{dislay:"block"}:{display:"none"}} >
            <Li>
              <NavLink to={`/infor/${auth.userHeader._id}`}>Profile</NavLink>
            </Li>
            <Li>
              {auth.userHeader.role === 1 ? (
                <NavLink to="/listUser">ManageUser</NavLink>
              ) : (
                <NavLink to="/forum">Forum</NavLink>
              )}
            </Li>
            <Li>
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </Li>
          </DropItem>
        </NavLink>
      </NavMenu>
    );
  };

  const transFrom = {
    transform: auth.token ? "translateY(-5px)" : 0,
  };

  return (
    <Nav>
      {/* <SideBar/> */}
      <NavMenu className="logo">
        <h1>
          <NavLink to="/">STU-HOME</NavLink>
        </h1>
      </NavMenu>
      <Bars />
      <NavMenu>
        <NavLink to="/" activeStyle>
          Home
        </NavLink>
        <NavLink to="/report" activeStyle>
          Report
        </NavLink>
        <NavLink to="/member" activeStyle>
          Member
        </NavLink>
        <NavLink to="/forum" activeStyle>
          Forum
        </NavLink>
      </NavMenu>
      <NavMenu style={transFrom}>
        {auth.token ? (
          userLink()
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">Sign In</NavBtnLink>
            <NavBtnLink to="/register">Register</NavBtnLink>
          </NavBtn>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
