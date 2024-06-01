import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage({ userId, setUserId }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleRole = (path) => {
        navigate(path);
    };
    

    const handleLogout = () => {
        setUserId(null);
        navigate('/');
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '20px' }}>
                <button onClick={() => handleNavigation('/manageTask')}>Task List</button>
                <button onClick={() => handleNavigation('/createTask')}>Create Task</button>
                <button onClick={() => handleRole('/managePermission')}>Permission</button>
                <button onClick={() => handleRole('/getRole')}>Role List</button>
                <button onClick={() => handleRole('/manageUser')}>User</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <div style={{ width: '80%', padding: '20px' }}>
                <h2>Hello</h2>
                <p>What are you going to do today?</p>
            </div>
        </div>
    );
}

export default MainPage;
