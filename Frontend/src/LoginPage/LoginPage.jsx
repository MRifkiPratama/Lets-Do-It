import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setUserId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log('Response data:', data);
            setUserId(data.account.id);
            localStorage.setItem('userId', data.account.id);
            localStorage.setItem('user', JSON.stringify(data.account));
            console.log('Logged in user ID:', data.account.id);
            navigate('/main');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-page">
        <header>
            <h1>LET'S DO IT</h1>
        </header>
        <div className="login-box">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email <span>*</span></label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <label htmlFor="password">Password <span>*</span></label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="login-button">LOGIN</button>
            </form>
            <p className="font">Don't have an account yet? <button className="register-button" onClick={handleRegister}>Register Now</button></p>
        </div>
    </div>
    );
}

export default LoginPage;