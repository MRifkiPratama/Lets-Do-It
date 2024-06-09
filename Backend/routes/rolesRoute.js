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
    await createRole(req, res);
    
});

router.get('/allroles', async (req, res) => {
    await getAllRoles(req, res);
    
});

router.put('/:role_id/update', async (req, res) => {
    await updateRole(req, res);
    
});

router.delete('/:role_id/delete', async (req, res) => {
    await deleteRole(req, res);
    
});

module.exports = router;
