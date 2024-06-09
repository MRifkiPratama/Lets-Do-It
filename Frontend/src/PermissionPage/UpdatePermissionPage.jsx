import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import './UpdatePermissionPage.css';

function UpdatePermissionPage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [redirectToPermissions, setRedirectToPermissions] = useState(false);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/permissions/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to update permission');
            }

            setRedirectToPermissions(true);
        } catch (error) {
            console.error('Error updating permission:', error.message);
        }
    };

    const handleBack = () => {
        setRedirectToPermissions(true);
    };

    if (redirectToPermissions) {
        return <Navigate to="/managePermission" />;
    }

    return (
        <div className="update-perm-container">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <div className="update-perm-content">
                <h2>Update Permission</h2>
                <div className="form-group">
                    <label htmlFor="name">Permission Name *</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleUpdate} className="update-button">
                        Update
                    </button>
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdatePermissionPage;