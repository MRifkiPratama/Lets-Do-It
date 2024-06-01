// server/routes/recipes.js
const express = require('express');

const { 
    createPermission,
    getAllPermission,
    updatePermission,
    deletePermission,
    getPermissionById,

} = require('../controllers/PermissionController');

const router = express.Router();

router.post('/create', async (req, res) => {
    const account = await createPermission(req, res);
    res.json(account);
});

router.get('/allpermission', async (req, res) => {
    const account = await getAllPermission(req, res);
    res.json(account);
});

router.put('/:id/update', async (req, res) => {
    const account = await updatePermission(req, res);
    res.json(account);
});

router.delete('/:id/delete', async (req, res) => {
    const account = await deletePermission(req, res);
    res.json(account);
});

router.get('/:id', async (req, res) => {
    const account = await getPermissionById(req, res);
    res.json(account);
});


module.exports = router;
