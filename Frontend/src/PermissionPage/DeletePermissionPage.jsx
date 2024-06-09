import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function DeletePermissionPage() {
    const { id } = useParams();
    const [redirectToPermissions, setRedirectToPermissions] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/permissions/${id}/delete`, {
                method: 'DELETE', 
            });

            if (!response.ok) {
                throw new Error('Failed to delete permission');
            }

            setRedirectToPermissions(true);
        } catch (error) {
            console.error('Error deleting permission:', error.message);
        }
    };

    if (redirectToPermissions) {
        return <Navigate to="/managePermission" />;
    }

    return (
        <div>
            <h2>Delete Permission</h2>
            <p>Are you sure you want to delete this permission?</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeletePermissionPage;
