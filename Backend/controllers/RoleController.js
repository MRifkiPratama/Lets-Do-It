const pool = require('../db');

async function createRole(req, res) {
    const { role_name } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO roles (role_name) VALUES ($1) RETURNING *',
            [role_name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Role not found" });
        }

        const createRole = result.rows[0];

        res.status(200).json(createRole);
    } catch (error) {
        console.error('Error in roleAssign:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function getAllRoles(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM roles;'
        );
        if (!result) {
            res.status(404).send("No roles found");
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

async function updateRole(req, res) {
    const { role_id } = req.params;
    const { role_name } = req.body;

    try {
        const roleCheck = await pool.query(
            'SELECT role_id FROM roles WHERE role_id = $1',
            [role_id]
        );
    
        if (roleCheck.rowCount === 0) {
            return res.status(404).json({ error: "Role not found" });
        }
    
        const result = await pool.query(
            'UPDATE roles SET role_name = $2, updated_at = CURRENT_TIMESTAMP WHERE role_id = $1 RETURNING *',
            [role_id, role_name]
        );
    
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Role not found" });
        }
    
        const updatedRole = result.rows[0];
    
        res.status(200).json(updatedRole);
    } catch (error) {
        console.error('Error in Role Update:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteRole(req, res) {
    const { role_id } = req.params; 
  
    try {
      const result = await pool.query(
        'DELETE FROM roles WHERE role_id = $1 RETURNING *',
        [role_id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Role deleted", role_id: role_id });
      } else {
        res.status(404).json({ message: "Role not found" });
      }
    } catch (error) {
      console.error('Error deleting Role:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createRole, getAllRoles, updateRole, deleteRole};