import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

function UpdateRolePage() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleUpdateRole = async () => {
        try {
            const response = await fetch(`http://localhost:5000/role/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
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

    return (
        <div>
            <h2>Update Role</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Role Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button onClick={handleUpdateRole}>Update Role</button>
            <button onClick={() => navigate('/getRole')}>Back</button> {/* Back button */}
        </div>
    );
}

export default UpdateRolePage;
