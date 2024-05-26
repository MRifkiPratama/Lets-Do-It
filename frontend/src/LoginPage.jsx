import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={handleRegister}>Register</button></p>
        </div>
    );
}

export default LoginPage;
