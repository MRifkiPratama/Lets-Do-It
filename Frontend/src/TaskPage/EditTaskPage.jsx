import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTaskPage.css';

function EditTaskPage() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        name: '',
        detail: '',
        due_date: '',
        status: ''
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:5000/task/${taskId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task');
                }
                const data = await response.json();
                setTask({
                    name: data.name || '',
                    detail: data.detail || '',
                    due_date: data.due_date ? new Date(data.due_date).toISOString().split('T')[0] : '',
                    status: data.status || 'not_started'
                });
            } catch (error) {
                console.error('Error fetching task:', error.message);
            }
        };
    
        fetchTask();
    }, [taskId]);
    
    useEffect(() => {
        console.log(task); // Pastikan Anda mencetak task di sini
    }, [task]); // Pastikan untuk memasukkan task sebagai dependency
    

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/task/${taskId}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            navigate('/manageTask');
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    const handleCancel = () => {
        navigate('/manageTask');
    };

    return (
        <div className="edit-task-page">
            <header>
                <h1>LET'S DO IT</h1>
            </header>
            <div className="edit-task-container">
                <h2>Edit Task</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={task.name}
                        onChange={(e) => setTask({ ...task, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Detail:</label>
                    <textarea
                        value={task.detail}
                        onChange={(e) => setTask({ ...task, detail: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={task.due_date}
                        onChange={(e) => setTask({ ...task, due_date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={task.status}
                        onChange={(e) => setTask({ ...task, status: e.target.value })}
                    >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="actions">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditTaskPage;
