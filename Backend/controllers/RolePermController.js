const pool = require('../db');

async function createRolePermission(req, res) {
    const { id, role_id, permission_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO role_permission (id, role_id, permission_id) VALUES ($1, $2, $3) RETURNING *',
            [id, role_id, permission_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Role failed" });
        }

        const newRolePermission = result.rows[0];

        res.status(200).json(newRolePermission);
    } catch (error) {
        console.error('Error in roleAssign:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function getAllRolePermission(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM role_permission;'
        );
        if (!result) {
            res.status(404).send("No role permission found");
        } else {
            res.send(result.rows);
        }
  
    } catch (error) {
        console.error('Error in fetch:', error);
        res.status(500).send({
            err: error,
        });
    }
};

async function updateRolePermission(req, res) {
    const { id } = req.params;
    const { role_id, permission_id } = req.body;

    try {
        const rolePermissionCheck = await pool.query(
            'SELECT id FROM role_permission WHERE id = $1',
            [id]
        );
    
        if (rolePermissionCheck.rowCount === 0) {
            return res.status(404).json({ error: "Role Permission not found" });
        }
    
        const result = await pool.query(
            'UPDATE role_permission SET permission_id = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND role_id = $2 RETURNING *',
            [id, role_id, permission_id]
        );
    
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Role not found" });
        }
    
        const updatedRole = result.rows[0];
    
        res.status(200).json(updatedRole);
    } catch (error) {
        console.error('Error in Role Permission Update:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteRolePermission(req, res) {
    const { id } = req.body;
  
    try {
      const result = await pool.query(
        'DELETE FROM role_permission WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Role permission deleted", id: id });
      } else {
        res.status(404).json({ message: "Role permission not found" });
      }

    } catch (error) {
      console.error('Error deleting Role Permission:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getRolePermissionById(req, res) {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM role_permission WHERE id = $1',
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No role permission was found" });
      }
  
      const role = result.rows;
  
      res.status(200).json({ role });
    } catch (error) {
      console.error('Error in getRoleById:', error);
      res.status(500).json({ error: "An error occurred" });
    }
}


module.exports = { createRolePermission, getAllRolePermission, updateRolePermission, deleteRolePermission, getRolePermissionById };