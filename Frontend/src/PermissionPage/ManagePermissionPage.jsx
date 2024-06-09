import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './ManagePermissionPage.css';

function ManagePermissionPage() {
    const [permissions, setPermissions] = useState([]);
    const [redirectToMain, setRedirectToMain] = useState(false);
    const [redirectToCreatePermission, setRedirectToCreatePermission] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

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
        <div className="manage-permission-page">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <SideBar userId={userId} setUserId={setUserId} />
            <div className="main-content">
                <h2>Manage Permissions</h2>
                <div>
                    <button onClick={handleCreatePermission}>Create New Permission</button>
                </div>
                <ul className="permission-list">
                    {permissions.map((permission) => (
                        <li key={permission.id}>
                            <h3>{permission.name}</h3>
                            <p>{permission.description}</p>
                            <div>
                                <Link to={`/updatePermission/${permission.id}`}>Update</Link>
                                <Link to={`/deletePermission/${permission.id}`}>Delete</Link>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={handleNavigateToMain}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default ManagePermissionPage;