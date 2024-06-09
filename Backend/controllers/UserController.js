// server/controllers/UserController.js
const pool = require('../db');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    const perm = await pool.query(
      'SELECT DISTINCT permission_id FROM users u RIGHT JOIN role_permission rp ON u.role_id = rp.role_id WHERE u.email = $1',
      [email]
    );

    const role = await pool.query(
      'SELECT distinct role_name FROM users u RIGHT JOIN roles r ON u.role_id = r.role_id where u.email = $1',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Incorrect email or password provided" });
    }

    var user = result.rows[0];
    user.permission = perm.rows.map((row) => row.permission_id);
    // var role_name = role.rows;
    user.role = role.rows.map((row) => row.role_name);
    //user.roles = role.rows.map((row) => row.role_name);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password provided" });
    }

    // Generate and return a token or set a session cookie here

    res.status(200).json({ message: "Login Successful", account: user});
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function signup(req, res) {
  const { name, email, password } = req.body;
  // Dapatkan nama file dari file yang diunggah
  const profileImage = req.file ? req.file.filename : null;

  try {
      const emailCheck = await pool.query('SELECT COUNT(*) FROM users WHERE email = $1', [email]);

      if (emailCheck.rows[0].count > 0) {
          return res.status(400).json({ error: "Email is already in use" });
      }

      const userCount = await pool.query('SELECT COUNT(*) FROM users');
      const isFirstUser = userCount.rows[0].count === 0;
      const role_id = isFirstUser ? 1 : null;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
          'INSERT INTO users (name, email, password, role_id, profile_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [name, email, hashedPassword, role_id, profileImage]
      );

      const newUser = result.rows[0];
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: "An error occurred" });
  }
}

async function getAllUser(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role_name FROM users u LEFT JOIN roles r ON u.role_id = r.role_id;'
    );
    if (!result.rows.length) {
      res.status(404).send("No users found");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    console.error('Error in fetch:', error);
    res.status(500).send({
      err: error,
    });
  }
}

async function roleAssign(req, res) {
  const { id } = req.params; // Access id from route parameters
  const { role_id } = req.body; // Access role_id from request body
  //const currentUserId = req.user.id;

  try {
    // Check if the current user has admin privileges
    // const adminCheck = await pool.query(
    //   'SELECT role_id FROM users WHERE id = $1',
    //   [currentUserId]
    // );

    // if (adminCheck.rowCount === 0 || adminCheck.rows[0].role_id !== 1) {
    //   return res.status(403).json({ error: "Permission denied" });
    // }

    const userCheck = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [id]
    );

    if (userCheck.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
      'UPDATE users SET role_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id, role_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = result.rows[0];

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in roleAssign:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}


async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No user found for the given user ID" });
    }

    const user = result.rows[0];

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function logout(req, res) {
  try {
    // Clear the session or remove the authentication token
    // This will effectively log the user out
    req.session.destroy(); // Assuming you're using session-based authentication
    // or
    // res.clearCookie('authToken'); // Assuming you're using token-based authentication

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports = { login, signup, getAllUser, roleAssign, getUserById, logout };