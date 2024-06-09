import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './GetAllRolePage.css';
import Sidebar from './SideBar/SideBar';

function GetAllRolesPage({ userId, setUserId }) {
    const [roles, setRoles] = useState([]);
    const [redirectToMain, setRedirectToMain] = useState(false);
    const [redirectToUpdate, setRedirectToUpdate] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:5000/role/allroles');
                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                const data = await response.json();
                setRoles(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching roles:', error.message);
            }
        };

        fetchRoles();
    }, []);

    const handleNavigateToMain = () => {
        setRedirectToMain(true);
    };

    const handleCreate = () => {
        setRedirectToUpdate(true);
    };

    if (redirectToMain) {
        return <Navigate to="/main" />;
    }

    if (redirectToUpdate) {
        return <Navigate to="/createRole" />;
    }

    return (
        <div className="get-all-roles-page">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <h2>All Roles</h2>            
            <Sidebar userId={userId} setUserId={setUserId} />
            <div className="get-all-roles-container">
                
                <div className="actions">
                    <button onClick={handleCreate}>Create Role</button>
                </div>
                <ul className="role-list">
                    {roles.map((role) => (
                        <li key={role.role_id}>
                            <h3>{role.role_name}</h3>
                            <div className="role-actions">
                                <Link to={`/updateRole/${role.role_id}`}>Update</Link>
                                <Link to={`/deleteRole/${role.role_id}`}>Delete</Link>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="actions">
                    <button onClick={handleNavigateToMain}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default GetAllRolesPage;
