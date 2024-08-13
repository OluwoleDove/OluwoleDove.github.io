import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }
        setError('');
        dispatch(login(email, password, history));
    };

    const handleGoogleLogin = () => {
        // Handle Google login
    };

    const handleFacebookLogin = () => {
        // Handle Facebook login
    };

    return (
        <div className="login-container">
            <Navbar />
            <div className="login-box">
                <h2>Login to Your Account</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="social-login">
                    <button className="google" onClick={handleGoogleLogin}>
                        <FaGoogle /> Login with Google
                    </button>
                    <button className="facebook" onClick={handleFacebookLogin}>
                        <FaFacebook /> Login with Facebook
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginScreen;
