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
    await createRolePermission(req, res);
    
});

router.get('/allpermission', async (req, res) => {
    await getAllRolePermission(req, res);
    
});

router.put('/:id/update', async (req, res) => {
    await updateRolePermission(req, res);
    
});

router.delete('/delete', async (req, res) => {
    await deleteRolePermission(req, res);
    
});

router.get('/:id', async (req, res) => {
    await getRolePermissionById(req, res);
    
});


module.exports = router;
