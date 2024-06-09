import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ManageRolePage.css';
import Sidebar from '../SideBar/SideBar';

function ManageRolePage({ userId, setUserId }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error('Error fetching user:', error.message);
        setError('Failed to fetch user. Please try again later.');
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5000/role/allroles');
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const rolesData = await response.json();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error.message);
        setError('Failed to fetch roles. Please try again later.');
      }
    };

    fetchUser();
    fetchRoles();
  }, [id]);

  const handleRoleAssign = async (roleId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}/roleassign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role_id: roleId }),
      });
      if (!response.ok) {
        throw new Error('Failed to assign role');
      }
      setUser({ ...user, role_id: roleId });
    } catch (error) {
      console.error('Error assigning role:', error.message);
      setError('Failed to assign role. Please try again later.');
    }
  };

  const handleSaveChanges = () => {
    navigate('/getAllUser');
  };
  
  return (
    <div className="manage-role-page">            
      <Sidebar userId={userId} setUserId={setUserId} />
      <header>
        <h1>LET'S DO IT</h1>
      </header>
      <h2>Manage Roles for User {id}</h2>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <div className='editrole-card'>
            <div className='user-info'><strong>Name:</strong> {user.name}</div>
            <div className='user-info'><strong>Role:</strong> {user.role_id}</div>
            <div style={{ marginBottom: '10px' }}>
              <select onChange={e => handleRoleAssign(e.target.value)} value={user.role_id || ''}>
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.role_id}>{role.role_name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <button onClick={handleSaveChanges}>Save Changes and Go Back</button>
    </div>
  );
}

export default ManageRolePage;
