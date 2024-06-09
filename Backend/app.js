// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const roleRoute = require('./routes/rolesRoute');
const rolePermissionRoute = require('./routes/rolePermissionRoute');
const permissionRoute = require('./routes/permissionRoute');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

// dotenv.config();

// console.log(process.env.password);

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/task', taskRoute);
app.use('/role', roleRoute);
app.use('/rolepermission', rolePermissionRoute);
app.use('/permissions', permissionRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
