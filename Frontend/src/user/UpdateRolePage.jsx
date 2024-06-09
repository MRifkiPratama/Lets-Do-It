import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRolePage.css';

function UpdateRolePage({ userId, setUserId }) {
    const { role_id } = useParams(); // Get the id parameter from the URL
    const [role_name, setName] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleUpdateRole = async () => {
        try {
            const response = await fetch(`http://localhost:5000/role/${role_id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role_name }),
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            const data = await response.json();
            console.log('Role updated:', data);
            navigate('/getRole'); // Navigate to GetAllRolesPage
        } catch (error) {
            console.error('Error updating role:', error.message);
            setError('Failed to update role');
        }
    };

    const handleBack = () => {
        navigate('/getRole');
    };

    return (
        <div className="update-role-container">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <h2>Update Role</h2>
            <div className="update-role-content">
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
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                    <button onClick={handleUpdateRole} className="update-button">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateRolePage;