import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, history));
    };

    return (
        <div className="login-screen">
            <Navbar />
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
            <Footer />
        </div>
    );
};

export default LoginScreen;