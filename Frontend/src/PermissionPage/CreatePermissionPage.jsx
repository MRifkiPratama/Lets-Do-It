import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './CreatePermissionPage.css';

function CreatePermissionPage({ userId, setUserId }) {
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
        <div className="create-permission-page">
        <header>
            <h1>LET'S DO IT</h1>
        </header>
        <SideBar userId={userId} setUserId={setUserId} />
            <div className="create-permission-card">
                <h2>Create Permission</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="create-button" onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreatePermissionPage;