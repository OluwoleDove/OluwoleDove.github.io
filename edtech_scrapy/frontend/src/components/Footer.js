import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="www.facebook.com"><FaFacebook /></a>
                    <a href="www.twitter.com"><FaTwitter /></a>
                    <a href="www.instagram.com"><FaInstagram /></a>
                </div>
                <p>&copy; 2024 OpenMentor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;