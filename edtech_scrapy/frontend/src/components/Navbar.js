// components/Navbar.js

import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Your Logo</div>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <FaBars className="menu-icon" />
        </nav>
    );
};

export default Navbar;