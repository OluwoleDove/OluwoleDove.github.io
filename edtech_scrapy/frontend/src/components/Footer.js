import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                </div>
                <p>&copy; 2024 OpenMentor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
