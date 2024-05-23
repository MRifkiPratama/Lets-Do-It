// server/routes/recipes.js
const express = require('express');

const { 
    createRolePermission, 
    getAllRolePermission, 
    updateRolePermission, 
    deleteRolePermission, 
    getRolePermissionById 
} = require('../controllers/RolePermController');

const router = express.Router();

router.post('/create', async (req, res) => {
    const account = await createRolePermission(req, res);
    res.json(account);
});

router.get('/allpermission', async (req, res) => {
    const account = await getAllRolePermission(req, res);
    res.json(account);
});

router.put('/:id/update', async (req, res) => {
    const account = await updateRolePermission(req, res);
    res.json(account);
});

router.delete('/delete', async (req, res) => {
    const account = await deleteRolePermission(req, res);
    res.json(account);
});

router.get('/:id', async (req, res) => {
    const account = await getRolePermissionById(req, res);
    res.json(account);
});


module.exports = router;
