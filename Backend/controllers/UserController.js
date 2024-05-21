const pool = require('../db');

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
  
      if (result.rowCount === 0) {
        return res.status(401).json({ error: "Incorrect email or password provided" });
      }
  
      const account = result.rows[0];
  
      res.status(200).json({message: "Login Successful", account});
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
  
  async function signup(req, res) {
    const { name, email, password } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );
  
      const newAccount = result.rows[0];
      delete newAccount.password;
  
      res.status(200).json(newAccount);
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async function getAllUser(req, res) {
    try {
      const result = await pool.query(
        'SELECT * FROM users;'
      );
      if (!result) {
        res.status(404).send("No users found");
      } else {
        res.send(result.rows);
      }
  
    
    } catch (error) {
        console.error('Error in fetch:', error);
        res.status(500).send({
          err: error,
        });
  }};
  
  module.exports = { login, signup, getAllUser};