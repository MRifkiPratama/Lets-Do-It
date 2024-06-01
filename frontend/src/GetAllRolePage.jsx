import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function GetAllRolesPage() {
    const [roles, setRoles] = useState([]);
    const [redirectToMain, setRedirectToMain] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:5000/role/allroles');
                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                const data = await response.json();
                setRoles(data);
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

    if (redirectToMain) {
        return <Navigate to="/createRole" />;
    }


    return (
        <div>
            <h2>All Roles</h2>
            <div>
            <button onClick={handleCreate}>Create Role</button>
            </div>
            <div>
            <button onClick={handleNavigateToMain}>Back to Main Page</button>
            </div>
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>
                        <h3>{role.name}</h3>
                        <div>
                            <Link to={`/updateRole/${role.id}`}>Update</Link>
                        </div>
                        <div>
                            <Link to={`/deleteRole/${role.id}`}>Delete</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetAllRolesPage;
