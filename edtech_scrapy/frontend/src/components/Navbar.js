import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="dashboard-header">
            <Link to="/">
                <h1>OpenMentor</h1>
            </Link>
            <FaBars className="menu-icon" onClick={toggleMenu} />
            <nav className="dashboard-nav">
                <ul className={menuOpen ? 'show' : ''}>
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