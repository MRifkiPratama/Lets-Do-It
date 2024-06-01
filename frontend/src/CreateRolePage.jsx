import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRolePage() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateRole = async () => {
        try {
            const response = await fetch('http://localhost:5000/role/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
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
        <div>
            <h2>Create Role</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Role Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button onClick={handleCreateRole}>Create Role</button>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default CreateRolePage;
