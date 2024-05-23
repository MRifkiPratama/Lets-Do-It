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

    res.status(200).json({ message: "Login Successful", account });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if there are any users in the database
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const isFirstUser = userCount.rows[0].count == 0;

    // Set role_id to 1 if this is the first user, otherwise use NULL or another default value
    const role_id = isFirstUser ? 1 : null;

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role_id]
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
  }
};

async function roleAssign (req, res){
  const { id, role_id } = req.body;
  //ini supaya siapa pun yang lagi masuk bisa dicek id nya
  //const currentUserId = req.user.id;

  try {
    //ini buat ngecek apabila yang lagi masuk itu role_id nya 1/admin atau bukan
    /*const adminCheck = await pool.query(
      'SELECT role_id FROM users WHERE id = $1',
      [currentUserId]
    );

    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role_id !== 1) {
      return res.status(403).json({ error: "Permission denied" });
    }*/

    const userCheck = await pool.query(
      'SELECT id FROM users WHERE id = $1',
      [id]
    );

    if (userCheck.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
      'UPDATE users SET role_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [ id, role_id ]
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

    const user = result.rows;

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: "An error occurred" });
  }
}


module.exports = { login, signup, getAllUser, roleAssign, getUserById };