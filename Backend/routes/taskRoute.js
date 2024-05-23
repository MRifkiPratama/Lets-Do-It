// server/routes/recipes.js
const express = require('express');
const {
    createTask,
    taskUpdate,
    getAllTask,
    getTaskById,
    getUserTasks,
    deleteTask
} = require('../controllers/TaskController');

const router = express.Router();

router.post('/:user_id/create', async (req, res) => {
    const account = await createTask(req, res);
    res.json(account);
});

router.put('/:user_id/update', async (req, res) => {
  const account = await taskUpdate(req, res);
  res.json(account);
});

router.get('/', async (req, res) => {
    const users = await getAllTask(req, res);
    res.json(users);
});

router.get('/findtask/:id', async (req, res) => {
    const users = await getTaskById(req, res);
    res.json(users);
});

router.get('/:user_id', async (req, res) => {
    const users = await getUserTasks(req, res);
    res.json(users);
});

router.delete('/:user_id/delete', async (req, res) => {
    const users = await deleteTask(req, res);
    res.json(users);
});


module.exports = router;
