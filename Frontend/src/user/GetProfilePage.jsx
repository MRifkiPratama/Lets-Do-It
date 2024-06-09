import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GetProfilePage.css';
import Sidebar from '../SideBar/SideBar';

const GetProfilePage = ({ userId, setUserId }) => {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    const handleBackToMain = () => {
        navigate('/main');
    };

    return (
        <div className="profile-page">
            <header>
                <h1>LET'S DO IT</h1>
            </header>     
            <h2>User Profile</h2>       
            <Sidebar userId={userId} setUserId={setUserId} />
            <div className="profile-container">
                
                <div className="profile-details">
                    <p><strong>Name:</strong> {loggedUser?.name}</p>
                    <p><strong>Email:</strong> {loggedUser?.email}</p>
                </div>
                <div className="profile-actions">
                    <button onClick={handleBackToMain}>Back to Main</button>
                </div>
            </div>
        </div>
    );
};

export default GetProfilePage;
