const pool = require('../db');

async function createPermission(req, res) {
    const { name, description } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO permission (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Creating permission failed" });
        }

        const newPermission = result.rows[0];
        res.status(200).json(newPermission);
    } catch (error) {
        console.error('Error in permission:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}


async function getAllPermission(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM permission;'
        );
        if (!result) {
            res.status(404).send("No permission found");
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

// async function updatePermission(req, res) {
//     const { id } = req.params;
//     const { name, description } = req.body;

//     try {
//         const rolePermissionCheck = await pool.query(
//             'SELECT id FROM permission WHERE id = $1',
//             [id]
//         );
    
//         if (rolePermissionCheck.rowCount === 0) {
//             return res.status(404).json({ error: "Role Permission not found" });
//         }
    
//         const result = await pool.query(
//             'UPDATE role_permission SET name = $2, description = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
//             [id, name, description]
//         );
    
//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: "Role not found" });
//         }
    
//         const updatedRole = result.rows[0];
    
//         res.status(200).json(updatedRole);
//     } catch (error) {
//         console.error('Error in Role Permission Update:', error);
//         res.status(500).json({ error: "An error occurred" });
//     }
// }

async function updatePermission(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const permissionExists = await pool.query(
            'SELECT id FROM permission WHERE id = $1',
            [id]
        );

        if (permissionExists.rowCount === 0) {
            return res.status(404).json({ error: "Permission not found" });
        }

        const result = await pool.query(
            'UPDATE permission SET name = $2, description = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
            [id, name, description]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Failed to update permission" });
        }

        const updatedPermission = result.rows[0];

        res.status(200).json(updatedPermission);
    } catch (error) {
        console.error('Error updating permission:', error);
        res.status(500).json({ error: "An error occurred" });
    }
}


async function deletePermission(req, res) {
    const { id } = req.params; 
  
    try {
      const result = await pool.query(
        'DELETE FROM permission WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Permission deleted", id: id });
      } else {
        res.status(404).json({ message: "Permission not found" });
      }

    } catch (error) {
      console.error('Error deleting Permission:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getPermissionById(req, res) {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM permission WHERE id = $1',
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No permission was found" });
      }
  
      const role = result.rows;
  
      res.status(200).json({ role });
    } catch (error) {
      console.error('Error in getPermissionById:', error);
      res.status(500).json({ error: "An error occurred" });
    }
}

module.exports = { createPermission, getAllPermission, updatePermission, deletePermission, getPermissionById };