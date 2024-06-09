const express = require('express');
const upload = require('../middleware/multerConfig');
const {
    login,
    signup,
    getAllUser,
    roleAssign,
    getUserById,
    logout
} = require('../controllers/UserController');

const router = express.Router();

router.post('/login', async (req, res) => {
    await login(req, res);
});

router.post('/signUp', upload.single('profileImage'), async (req, res) => {
    await signup(req, res);
});

router.get('/getAllUser', async (req, res) => {
    await getAllUser(req, res);
});

router.put('/:id/roleassign', async (req, res) => {
    await roleAssign(req, res);
});

router.get('/:id', async (req, res) => {
    await getUserById(req, res);
});

router.post('/logout', async (req, res) => {
    await logout(req, res);
});

module.exports = router;
