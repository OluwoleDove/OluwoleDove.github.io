// components/Navbar.js

import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


const Navbar = () => {
    return (
        <header className="dashboard-header">
            <h1>OpenMentor</h1>
            <nav className="dashboard-nav">
                <ul>
                    <li>All courses</li>
                    <li>My Lists</li>
                    <li>Wishlist</li>
                    <li>Archived</li>
                    <li>Learning Tools</li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;