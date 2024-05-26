import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CreateTaskPage from './CreateTaskPage';
import ManageTaskPage from './ManageTaskPage';
import MainPage from './MainPage';


function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserId={setUserId} />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createTask" element={<CreateTaskPage userId={userId} />} /> 
        <Route path="/manageTask" element={<ManageTaskPage userId={userId} />} />
        <Route path="/main" element={<MainPage userId={userId} setUserId={setUserId} />} />

      </Routes>
    </Router>
  );
}

export default App;
