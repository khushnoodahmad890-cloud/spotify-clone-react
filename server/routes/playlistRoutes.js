const express = require("express");

const router = express.Router();

const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getPlaylistSongs,
} = require("../controllers/playlistController");

const auth = require("../middleware/auth");


// Get user playlists
router.get(
  "/",
  auth,
  getPlaylists
);


// Create playlist
router.post(
  "/",
  auth,
  createPlaylist
);

// Remove song from playlist
router.delete(
  "/:id/songs",
  auth,
  removeSongFromPlaylist
);

// Delete playlist
router.delete(
  "/:id",
  auth,
  deletePlaylist
);


// Get songs inside playlist
router.get(
  "/:id",
  auth,
  getPlaylistSongs
);


// Add song to playlist
router.post(
  "/:id/songs",
  auth,
  addSongToPlaylist
);


module.exports = router;