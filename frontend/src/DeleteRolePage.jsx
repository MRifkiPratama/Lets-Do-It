import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteRolePage() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [error, setError] = useState('');

    const handleDeleteRole = async () => {
        try {
            const response = await fetch(`http://localhost:5000/role/${id}/delete`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete role');
            }

            // Role deleted successfully, navigate back to GetAllRolesPage
            navigate('/getRole');
        } catch (error) {
            console.error('Error deleting role:', error.message);
            setError('Failed to delete role');
        }
    };

    return (
        <div>
            <h2>Delete Role</h2>
            <p>Are you sure you want to delete? Deleted roles cannot be recovered.</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleDeleteRole}>Delete</button>
            <button onClick={() => navigate('/getRole')}>Back</button>
        </div>
    );
}

export default DeleteRolePage;
