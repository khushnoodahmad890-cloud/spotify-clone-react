const express = require("express");
const pool = require("../config/postgres");

const router = express.Router();

// =========================
// Get All Songs
// =========================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM songs ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Get Single Song
// =========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM songs WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Add New Song
// =========================
router.post("/", async (req, res) => {
  try {
    const {
      title,
      artist,
      album,
      duration,
      cover,
      audio,
      lyrics,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO songs
      (title, artist, album, duration, cover, audio, lyrics)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [title, artist, album, duration, cover, audio, lyrics || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Update Song
// =========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      artist,
      album,
      duration,
      cover,
      audio,
      lyrics,
    } = req.body;

    const result = await pool.query(
      `UPDATE songs
       SET
       title = $1,
       artist = $2,
       album = $3,
       duration = $4,
       cover = $5,
       audio = $6,
       lyrics = $7
       WHERE id = $8
       RETURNING *`,
      [title, artist, album, duration, cover, audio, lyrics || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// =========================
// Delete Song
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;