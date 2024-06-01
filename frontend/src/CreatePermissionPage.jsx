// src/CreatePermissionPage.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function CreatePermissionPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [redirectToPermissions, setRedirectToPermissions] = useState(false);

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:5000/permissions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to create permission');
            }

            setRedirectToPermissions(true);
        } catch (error) {
            console.error('Error creating permission:', error.message);
        }
    };

    if (redirectToPermissions) {
        return <Navigate to="/managePermission" />;
    }

    return (
        <div>
            <h2>Create Permission</h2>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description: </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={handleCreate}>Create</button>
        </div>
    );
}

export default CreatePermissionPage;
