import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageTaskPage({ userId }) {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/task/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            }
        };

        fetchTasks();
    }, [userId]);

    const handleAddTask = () => {
        navigate('/createTask');
    };

    const handleBackToMainPage = () => {
        navigate('/main');
    };

    return (
        <div>
            <h2>Manage Tasks</h2>
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={handleBackToMainPage} style={{ marginLeft: '10px' }}>Back to Main Page</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.name}</h3>
                        <p>{task.detail}</p>
                        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageTaskPage;
