import React from "react";
import menu from '../assets/menu.png'
import logo from '../assets/saketa-logo.png'
import employeepic from '../assets/employee-img.jpg'
import '../NavBar/style.css'
import {
  Link
} from 'react-router-dom'
const NavBar: React.FC = () => {
  return (
    <nav className="navbar flex-container">
      <div className="menu-button">
        <span id="menu-btn" className="show-button position-relative"
        ><Link to={""}><img className="menu" src={menu} alt="menu"
        /></Link>
        </span>
      </div>
      <div className="saketa-icon">
        <img src={logo} alt="logo" className="saketa-logo position-relative" />
      </div>
      <div className="employee-directory position-relative">
        <h1 className="primary-text blue position-relative font-styles">Employee Directory</h1>
        <p className="secondary-text position-relative font-styles secondarytext-color secondary-color">
          The Ultimate people Directory Experience
        </p>
      </div>
      <div className="welcome"><h1 className="usergreeting blue position-relative">Welcome,</h1></div>
      <div className="employee">
        <h1 id="recent-emp" className="username position-relative font-styles secondary-color">Andrew Philips</h1>
      </div>
      <div className="employee-pic">
        <img
          src={employeepic}
          alt="employee1"
          className="user-image position-relative"
        />
      </div>
    </nav>
  )
}
export default NavBar
