import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CreateTaskPage from './CreateTaskPage';
import ManageTaskPage from './ManageTaskPage';
import MainPage from './MainPage';
import GetAllRole from './GetAllRolePage';
import CreateRolePage from './CreateRolePage';
import UpdateRolePage from './UpdateRolePage';
import DeleteRolePage from './DeleteRolePage';
import ManagePermissionPage from './ManagePermissionPage';
import CreatePermissionPage from './CreatePermissionPage'; // Import the create permission page
import UpdatePermissionPage from './UpdatePermissionPage'; // Import the update permission page
import DeletePermissionPage from './DeletePermissionPage'; // Import the delete permission page

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserId={setUserId} />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createTask" element={<CreateTaskPage userId={userId} />} /> 
        <Route path="/manageTask" element={<ManageTaskPage userId={userId} />} />
        <Route path="/createRole" element={<CreateRolePage userId={userId} />} />
        <Route path="/updateRole/:id" element={<UpdateRolePage />} />
        <Route path="/deleteRole/:id" element={<DeleteRolePage />} />
        <Route path="/getRole" element={<GetAllRole userId={userId} />} />
        <Route path="/main" element={<MainPage userId={userId} setUserId={setUserId} />} />
        <Route path="/managePermission" element={<ManagePermissionPage />} />
        <Route path="/createPermission" element={<CreatePermissionPage />} /> {/* Add this line */}
        <Route path="/updatePermission/:id" element={<UpdatePermissionPage />} />
        <Route path="/deletePermission/:id" element={<DeletePermissionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
