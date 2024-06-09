import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

function SideBar({ userId, setUserId }) {
    const navigate = useNavigate();
    const LoggedUser = JSON.parse(localStorage.getItem('user'));
    const [isOpen, setIsOpen] = useState(false);
    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleRole = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        console.log("ditekan");
        setUserId(null);
        localStorage.removeItem('userId');
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
         <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? ' < ' : ' > '}
            </button>

            <div className="profile-section">
                <img src={`http://localhost:5000/uploads/${LoggedUser.profile_image}`} alt="Profile" className="profile-image" />
                <p>Hi, {LoggedUser.name}</p>
            </div>
            <div className="sidebar-content">
            <button className="sidebar-button" onClick={() => handleNavigation('/manageTask')}>Task List</button>
            <button className="sidebar-button" onClick={() => handleNavigation('/createTask')}>Create Task</button>
            {LoggedUser.role.includes("Admin") && <button className="sidebar-button" onClick={() => handleRole('/managePermission')}>Permission</button>}
            {LoggedUser.role.includes("Admin") &&<button className="sidebar-button" onClick={() => handleRole('/getRole')}>Role List</button>}
            {LoggedUser.role.includes("Admin") && <button className="sidebar-button" onClick={() => handleRole('/getAllUser')}>User</button>}
            <button className="sidebar-button" onClick={() => handleNavigation('/profile')}>Profile</button>
            <button className="sidebar-button logout-button" onClick={handleLogout}>Log Out</button>
        </div>
        </div>
    );
}

export default SideBar;
