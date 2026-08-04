const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/postgres");
const auth = require("../middleware/auth");

const router = express.Router();

// =========================
// Register User
// =========================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully ✅",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Login User
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// User Profile (Protected)
// =========================
router.get("/profile", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, avatar, bio, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Update User Profile (Protected)
// =========================
router.put("/profile", auth, async (req, res) => {
  try {
    const { username, avatar, bio } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const existingUsername = await pool.query(
      "SELECT id FROM users WHERE username = $1 AND id != $2",
      [username, req.user.id]
    );

    if (existingUsername.rows.length > 0) {
      return res.status(400).json({
        message: "Username already taken",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET username = $1, avatar = $2, bio = $3
       WHERE id = $4
       RETURNING id, username, email, avatar, bio, created_at`,
      [username, avatar || null, bio || null, req.user.id]
    );

    res.json({
      message: "Profile updated ✅",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Change Password (Protected)
// =========================
router.put("/profile/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user.id]
    );

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, req.user.id]
    );

    res.json({
      message: "Password updated ✅",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;