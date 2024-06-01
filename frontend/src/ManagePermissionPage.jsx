import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function ManagePermissionPage() {
    const [permissions, setPermissions] = useState([]);
    const [redirectToMain, setRedirectToMain] = useState(false);
    const [redirectToCreatePermission, setRedirectToCreatePermission] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetch('http://localhost:5000/permissions/allpermission');
                if (!response.ok) {
                    throw new Error('Failed to fetch permissions');
                }
                const data = await response.json();
                setPermissions(data);
            } catch (error) {
                console.error('Error fetching permissions:', error.message);
            }
        };

        fetchPermissions();
    }, []);

    const handleNavigateToMain = () => {
        setRedirectToMain(true);
    };

    const handleCreatePermission = () => {
        setRedirectToCreatePermission(true);
    };

    if (redirectToMain) {
        return <Navigate to="/main" />;
    }

    if (redirectToCreatePermission) {
        return <Navigate to="/createPermission" />;
    }

    return (
        <div>
            <h2>Manage Permissions</h2>
            <div>
                <button onClick={handleCreatePermission}>Create New Permission</button>
                <button onClick={handleNavigateToMain}>Back to Main Page</button>
            </div>
            <ul>
                {permissions.map((permission) => (
                    <li key={permission.id}>
                        <h3>{permission.name}</h3>
                        <h3>{permission.description}</h3>
                        <div>
                            <Link to={`/updatePermission/${permission.id}`}>Update</Link>
                        </div>
                        <div>
                            <Link to={`/deletePermission/${permission.id}`}>Delete</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManagePermissionPage;
