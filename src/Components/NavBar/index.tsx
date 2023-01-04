import React from "react";
import menu from '../assets/menu.png'
import logo from '../assets/saketa-logo.png'
import employeepic from '../assets/employee-img.jpg'
import '../NavBar/style.css'
import {
  Link
} from 'react-router-dom'
const NavBar:React.FC =() => {
    return (
      <nav className="navbar flex-container">
      <div className="logo-0">
        <span id="menu-btn" className="show-btn position-relative"
          ><Link to={'/show_sidebar'}><img className="menu"  src={menu} alt="menu"
          /></Link>
        </span>
      </div>
      <div className="logo-1">
        <img src={logo} alt="logo" className="logo-nav position-relative" />
      </div>
      <div className="logo-2 position-relative">
        <h1 className="head-nav blue position-relative font-family2">Employee Directory</h1>
        <p className="text-nav position-relative font-family2 list-elm-color">
          The Ultimate people Directory Experience
        </p>
      </div>
      <div className="log-3"><h1 className="usergreeting-nav blue position-relative">Welcome,</h1></div>
      <div className="logo-4">
        <h1 id="recent-emp" className="username-nav head-text position-relative font-family2">Andrew Philips</h1>
      </div>
      <div className="logo-1">
        <img
          src={employeepic}
          alt="employee1"
          className="employee1-nav position-relative"
        />
      </div>
    </nav>
    )
}
export default NavBar
