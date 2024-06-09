import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRolePage.css';

function CreateRolePage() {
    const [role_name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateRole = async () => {
        try {
            const response = await fetch('http://localhost:5000/role/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role_name }),
            });

            if (!response.ok) {
                throw new Error('Failed to create role');
            }

            const data = await response.json();
            console.log('Role created:', data);
        } catch (error) {
            console.error('Error creating role:', error.message);
            setError('Failed to create role');
        }
    };

    const handleBack = () => {
        navigate('/getRole');
    };

    return (
        <div className="create-role-container">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <h2>Create Role</h2>
            <div className="create-role-content">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Role Name</label>
                    <input
                        type="text"
                        id="name"
                        value={role_name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleCreateRole} className="create-role-button">
                        Create Role
                    </button>
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateRolePage;