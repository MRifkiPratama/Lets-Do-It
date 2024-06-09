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
   await createPermission(req, res);
   
});

router.get('/allpermission', async (req, res) => {
    await getAllPermission(req, res);
});

router.put('/:id/update', async (req, res) => {
 await updatePermission(req, res);
});

router.delete('/:id/delete', async (req, res) => {
   await deletePermission(req, res);
  
});

router.get('/:id', async (req, res) => {
     await getPermissionById(req, res);
    
});


module.exports = router;
