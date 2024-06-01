import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

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

    if (redirectToPermissions) {
        return <Navigate to="/managePermission" />;
    }

    return (
        <div>
            <h2>Update Permission</h2>
            <div>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description: </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdatePermissionPage;
