const pool = require('../db');

  async function createTask(req, res) {
    const { user_id } = req.params;
    const { name, detail, due_date } = req.body;
  
    try {
      const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);

      if (userCheck.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const result = await pool.query(
        'INSERT INTO tasks (user_id, name, detail, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, name, detail, due_date]
      );
  
      const newTask = result.rows[0];
      //delete newAccount.password;
  
      res.status(200).json(newTask);
    } catch (error) {
      console.error('Cannot find user:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async function taskUpdate(req, res) {
    const { user_id } = req.params;
    const { id, status, due_date } = req.body;
  
    try {
      const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);

      if (userCheck.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const result = await pool.query(
        'UPDATE tasks SET status = $2, due_date = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $4 RETURNING *',
        [id, status, due_date, user_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      const updatedTask = result.rows[0];
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error in taskUpdate:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async function getAllTask(req, res) {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks;'
      );
      if (!result) {
        res.status(404).send("No tasks found");
      } else {
        res.send(result.rows);
      }
  
    
    } catch (error) {
        console.error('Error in fetch:', error);
        res.status(500).send({
          err: error,
        });
  }};

  async function getTaskById(req, res) {
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No tasks found for the given user ID" });
      }
  
      const tasks = result.rows;
  
      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Error in getUserTasks:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async function getUserTasks(req, res) {
    const { user_id } = req.params;
  
    try {
      const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);

      if (userCheck.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1',
        [user_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No tasks found for the given user ID" });
      }
  
      const tasks = result.rows;
  
      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Error in getUserTasks:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async function deleteTask(req, res) {
    const { user_id } = req.params;
    const { id } = req.body;
  
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE user_id = $1 AND id = $2 RETURNING *',
        [user_id, id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Task deleted", id: id, user_id: user_id });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  
module.exports = { createTask, taskUpdate, getAllTask, getTaskById, getUserTasks, deleteTask};