import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTaskPage({ userId }) {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [progress, setProgress] = useState('not_started');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/task/${userId}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, detail, due_date: dueDate, status: progress })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log(data); 
            navigate(`/manageTask`); 
        } catch (error) {
            console.error('Task creation failed:', error.message);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Detail"></textarea>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" required />
                <select value={progress} onChange={(e) => setProgress(e.target.value)}>
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTaskPage;
