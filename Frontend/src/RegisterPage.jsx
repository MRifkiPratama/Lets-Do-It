import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log(data); // Handle successful registration
            setRegistrationSuccess(true); // Set registration success state to true
        } catch (error) {
            console.error('Registration failed:', error.message);
            // Display error message to the user
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        // <div>
        //     {registrationSuccess ? (
        //         <div>
        //             <p>Registration successful! You can now proceed to login.</p>
        //             <button onClick={handleLogin}>Login</button>
        //         </div>
        //     ) : (
        //         <div>
        //             <h2>Register</h2>
        //             <form onSubmit={handleSubmit}>
        //                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        //                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        //                 <button type="submit">Register</button>
        //             </form>
        //         </div>
        //     )}
        // </div>
        <div className="register-page">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            {registrationSuccess ? (
                <div className="success-message">
                    <p>Registration successful! You can now proceed to login.</p>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div className="register-box">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name <span>*</span></label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                        <label htmlFor="email">Email <span>*</span></label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <label htmlFor="password">Password <span>*</span></label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <button type="submit" className="register-button">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default RegisterPage;
