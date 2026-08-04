const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/postgres");
const userRoutes = require("./routes/users");
const songRoutes = require("./routes/songs");
const playlistRoutes = require("./routes/playlistRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);



// Test Route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Spotify API is running 🚀",
      database: "Connected ✅",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
      code: err.code,
      detail: err,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});