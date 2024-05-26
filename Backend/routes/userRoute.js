// server/routes/recipes.js
const express = require('express');
const {
    login,
    signup,
    getAllUser,
    roleAssign,
    getUserById
} = require('../controllers/UserController');

const router = express.Router();

router.post('/login', async (req, res) => {
    const account = await login(req, res);
    res.json(account);
});

router.post('/signUp', async (req, res) => {
    const newAcc = await signup(req, res);
    res.json(newAcc);
});

router.get('/getAllUser', async (req, res) => {
    const users = await getAllUser(req, res);
    res.json(users);
});

router.put('/roleassign', async (req, res) => {
    const users = await roleAssign(req, res);
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await getUserById(req, res);
    res.json(user);
});

module.exports = router;
