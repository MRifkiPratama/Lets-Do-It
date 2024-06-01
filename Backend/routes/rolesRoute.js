// server/routes/recipes.js
const express = require('express');
const {
  createRole,
  getAllRoles,
  deleteRole,
  updateRole,
  getRoleById
} = require('../controllers/RoleController');

const router = express.Router();

router.post('/create', async (req, res) => {
    const account = await createRole(req, res);
    res.json(account);
});

router.get('/allroles', async (req, res) => {
    const account = await getAllRoles(req, res);
    res.json(account);
});

router.put('/:id/update', async (req, res) => {
    const account = await updateRole(req, res);
    res.json(account);
});

router.delete('/:id/delete', async (req, res) => {
    const account = await deleteRole(req, res);
    res.json(account);
});

router.put('/:id', async (req, res) => {
    const account = await getRoleById(req, res);
    res.json(account);
});


module.exports = router;
