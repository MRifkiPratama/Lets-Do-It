import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import SideBar from '../SideBar/SideBar';

function MainPage({ userId, setUserId }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    return (
        <div className="main-page">
            <SideBar userId={userId} setUserId={setUserId} />
            <div className="content">
                <h2>Hello</h2>
                <p>What are you going to do today?</p>
            </div>
        </div>
    );
}

export default MainPage;