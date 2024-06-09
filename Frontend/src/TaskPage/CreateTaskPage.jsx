import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './CreateTaskPage.css'

function CreateTaskPage({ userId, setUserId }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/task/${userId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, detail, due_date: due_date, status: status || 'not_started' }),
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

  const handleBackToMainPage = () => {
    navigate('/main'); // Navigate to the main page
  };

  return (
    <div className="create-task-page">
      <header>
        <h1>LET'S DO IT</h1>
      </header>
      <SideBar userId={userId} setUserId={setUserId} />
      <div className="create-task-form">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Detail"
          ></textarea>
          <input
            type="date"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
            required
          />
          <select value={status || 'not_started'} onChange={(e) => {console.log('Selected status:', e.target.value); setStatus(e.target.value)}}>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          </select>
          <button style={{marginBottom:"10px"}}type="submit">Create Task</button>
          <button onClick={handleBackToMainPage}>Back to Main Page</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskPage;