import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage';
import CreateTaskPage from './TaskPage/CreateTaskPage';
import ManageTaskPage from './TaskPage/ManageTaskPage';
import EditTaskPage from './TaskPage/EditTaskPage';
import MainPage from './MainPage/MainPage';
import GetAllRole from './GetAllRolePage';
import CreateRolePage from './user/CreateRolePage';
import UpdateRolePage from './user/UpdateRolePage';
import DeleteRolePage from './DeleteRolePage';
import ManagePermissionPage from './PermissionPage/ManagePermissionPage';
import CreatePermissionPage from './PermissionPage/CreatePermissionPage'; // Import the create permission page
import UpdatePermissionPage from './PermissionPage/UpdatePermissionPage'; // Import the update permission page
import DeletePermissionPage from './PermissionPage/DeletePermissionPage'; // Import the delete permission page
import GetUserPage from './user/GetUserPage'; // Import the GetUserPage
import ManageRolePage from './user/ManageRolePage'; // Import the ManageRolePage
import GetProfilePage from './user/GetProfilePage';

function App() {
  const [userId, setUserId] = useState(null);
  const [taskId, setTaskId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserId={setUserId} />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createTask" element={<CreateTaskPage userId={userId} />} /> 
        <Route path="/manageTask" element={<ManageTaskPage userId={userId} setUserId={setUserId}/>} />
        <Route path="/editTask/:taskId" element={<EditTaskPage />} />
        <Route path="/createRole" element={<CreateRolePage userId={userId} />} />
        <Route path="/updateRole/:role_id" element={<UpdateRolePage />} />
        <Route path="/deleteRole/:id" element={<DeleteRolePage />} />
        <Route path="/getRole" element={<GetAllRole userId={userId} />} />
        <Route path="/main" element={<MainPage userId={userId} setUserId={setUserId} />} />
        <Route path="/managePermission" element={<ManagePermissionPage />} />
        <Route path="/createPermission" element={<CreatePermissionPage />} /> {/* Add this line */}
        <Route path="/updatePermission/:id" element={<UpdatePermissionPage />} />
        <Route path="/deletePermission/:id" element={<DeletePermissionPage />} />
        <Route path="/getAllUser" element={<GetUserPage />} /> {/* Add this line */}
        <Route path="/manageRole/:id" element={<ManageRolePage />} />
        <Route path="/profile" element={<GetProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
