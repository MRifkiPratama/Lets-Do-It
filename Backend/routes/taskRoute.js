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
     await createTask(req, res);
  
});

router.put('/:id/update', async (req, res) => {
    await taskUpdate(req, res);
});

router.get('/', async (req, res) => {
    await getAllTask(req, res);
    
});

router.get('/:id', async (req, res) => {
    await getTaskById(req, res);
    
});

router.get('/user/:user_id', async (req, res) => {
    await getUserTasks(req, res);
});

router.delete('/user/:user_id/delete', async (req, res) => {
    await deleteTask(req, res);
});


module.exports = router;
