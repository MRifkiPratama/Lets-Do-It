import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './ManageTaskPage.css';
import { FaPencilAlt } from 'react-icons/fa';

function ManageTaskPage({ userId, setUserId }) {
    const LoggedUser = JSON.parse(localStorage.getItem('user'));
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
        } else {
            const fetchTasks = async () => {
                try {
                    let response;
                    if (LoggedUser.role.includes("Admin") || LoggedUser.role.includes("Task Editor")) {
                        response = await fetch('http://localhost:5000/task');
                    } else {
                        response = await fetch(`http://localhost:5000/task/${userId}`);
                    }

                    if (!response.ok) {
                        throw new Error('Failed to fetch tasks');
                    }

                    const data = await response.json();
                    if (LoggedUser.role.includes("Admin") || LoggedUser.role.includes("Task Editor")) {
                        setTasks(data); // Assuming data is an array of all tasks
                    } else {
                        setTasks(data.tasks); // Assuming data.tasks is an array of user's tasks
                    }
                } catch (error) {
                    console.error('Error fetching tasks:', error.message);
                }
            };

            fetchTasks();
        }
    }, [LoggedUser.role, navigate, setTasks]);

    const handleAddTask = () => {
        navigate('/createTask');
    };

    const handleBackToMainPage = () => {
        navigate('/main');
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (!taskToUpdate) {
                throw new Error('Task not found');
            }

            const updatedTaskData = {
                ...taskToUpdate,
                status: 'completed',
                due_date: new Date().toISOString(),
            };

            const response = await fetch(`http://localhost:5000/task/${taskId}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
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
            const response = await fetch(`http://localhost:5000/task/user/${userId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskId }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleEditTask = (taskId) => {
        navigate(`/editTask/${taskId}`);
    };

    const groupedTasks = tasks.reduce(
        (acc, task) => {
            acc[task.status].push(task);
            return acc;
        },
        { not_started: [], in_progress: [], completed: [] }
    );

    return (
        <div className="manage-task-page">
            <SideBar userId={userId} setUserId={setUserId} />
            <div className="manage-task-container">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
                <div className="title">
                    <h1 className="page-title">Manage Task</h1>
                </div>
                <div className="actions-addtask">
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
                <div className="task-container">
                    <div className="task-column">
                        <h3>Not Started</h3>
                        <ul>
                            {groupedTasks.not_started.map((task) => (
                                <li key={task.id}>
                                    <p style={{fontSize: '24px', fontWeight: 'bold'}}>{task.name}</p>
                                    <p style={{fontSize: '20px'}}>{task.detail}</p>
                                    <p style={{fontSize: '20px'}}>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                                    <div className="task-actions">
                                        {(LoggedUser.role.includes("Admin") || LoggedUser.role.includes("Task Editor")) && (
                                            <>
                                                <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                                <button onClick={() => handleEditTask(task.id)}><FaPencilAlt /></button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="task-column">
                        <h3>In Progress</h3>
                        <ul>
                            {groupedTasks.in_progress.map((task) => (
                                <li key={task.id}>
                                    <p style={{fontSize: '24px', fontWeight: 'bold'}}>{task.name}</p>
                                    <p style={{fontSize: '20px'}}>{task.detail}</p>
                                    <p style={{fontSize: '20px'}}>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                                    <div className="task-actions">
                                        {(LoggedUser.role.includes("Admin") || LoggedUser.role.includes("Task Editor")) && (
                                            <>
                                                <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                                <button onClick={() => handleEditTask(task.id)}><FaPencilAlt /></button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="task-column">
                        <h3>Completed</h3>
                        <ul>
                            {groupedTasks.completed.map((task) => (
                                <li key={task.id}>
                                    <p style={{fontSize: '24px', fontWeight: 'bold'}}>{task.name}</p>
                                    <p style={{fontSize: '20px'}}>{task.detail}</p>
                                    <p style={{fontSize: '20px'}}>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                                    <div className="task-actions">
                                        {(LoggedUser.role.includes("Admin") || LoggedUser.role.includes("Task Editor")) && (
                                            <>
                                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                                <button onClick={() => handleEditTask(task.id)}><FaPencilAlt /></button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="actions-back">
                    <button onClick={handleBackToMainPage}>Back to Main Page</button>
                </div>
            </div>
        </div>
    );
}

export default ManageTaskPage;