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

    const handleCompleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${userId}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: taskId,
                    status: 'completed',
                    due_date: new Date().toISOString(), // Update due date to current time
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const updatedTask = await response.json();
            setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
        } catch (error) {
            console.error('Error completing task:', error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${userId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskId }), // Include task id in the request body
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            // Remove the deleted task from the tasks state
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
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
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        {task.status !== 'completed' && (
                            <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                            
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageTaskPage;
