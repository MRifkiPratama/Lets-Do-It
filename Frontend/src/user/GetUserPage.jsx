import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './GetUserPage.css';
import Sidebar from '../SideBar/SideBar';

function GetAllUserPage({ userId, setUserId }) {
  const [users, setUsers] = useState([]);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const LoggedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await fetch('http://localhost:5000/users/getAllUser');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, []);
      const handleNavigateToMain = () => {
        setRedirectToMain(true);
    };
      if (redirectToMain) {
        return <Navigate to="/main" />;
    }
  return (
    <div className="get-all-user-page">
      <header>
        <h1>LET'S DO IT</h1>
      </header>
      <Sidebar userId={userId} setUserId={setUserId} />
      <h2>User List</h2>
      <div className="get-all-user-container">
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>
              <div>
                <div><strong>Nama:</strong> {user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Role:</strong> {user.role_name}</div> 
                {LoggedUser.role.includes("Admin") && <div className="user-actions">
                  <Link to={`/manageRole/${user.id}`}>Manage Role</Link>
                </div>}
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

export default GetAllUserPage;
