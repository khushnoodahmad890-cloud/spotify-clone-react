const pool = require("../config/postgres");


// GET USER PLAYLISTS
exports.getPlaylists = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM playlists
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch playlists",
    });
  }
};



// CREATE PLAYLIST
exports.createPlaylist = async (req, res) => {
  try {

    const { name } = req.body;

    const result = await pool.query(
      `
      INSERT INTO playlists(name,user_id)
      VALUES($1,$2)
      RETURNING *
      `,
      [
        name,
        req.user.id
      ]
    );


    res.status(201).json(
      result.rows[0]
    );


  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to create playlist",
    });

  }
};



// DELETE PLAYLIST
exports.deletePlaylist = async (req, res) => {
  try {

    await pool.query(
      `
      DELETE FROM playlists
      WHERE id=$1
      AND user_id=$2
      `,
      [
        req.params.id,
        req.user.id
      ]
    );


    res.json({
      message:"Playlist deleted",
    });


  } catch(err){

    console.error(err);

    res.status(500).json({
      message:"Failed to delete playlist",
    });

  }
};



// ADD SONG TO PLAYLIST
exports.addSongToPlaylist = async (req,res)=>{
  try {

    const {
      songId
    } = req.body;


    const playlist = await pool.query(
      `
      SELECT *
      FROM playlists
      WHERE id=$1
      AND user_id=$2
      `,
      [
        req.params.id,
        req.user.id
      ]
    );


    if(playlist.rows.length===0){

      return res.status(404).json({
        message:"Playlist not found"
      });

    }


    await pool.query(
      `
      INSERT INTO playlist_songs(
        playlist_id,
        song_id
      )
      VALUES($1,$2)
      ON CONFLICT DO NOTHING
      `,
      [
        req.params.id,
        songId
      ]
    );


    res.json({
      message:"Song added to playlist"
    });


  } catch(err){

    console.error(err);

    res.status(500).json({
      message:"Failed adding song"
    });

  }
};

// REMOVE SONG FROM PLAYLIST
exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;

    // Verify the playlist belongs to the current user
    const playlist = await pool.query(
      `
      SELECT *
      FROM playlists
      WHERE id = $1
      AND user_id = $2
      `,
      [
        req.params.id,
        req.user.id,
      ]
    );

    if (playlist.rows.length === 0) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    await pool.query(
      `
      DELETE FROM playlist_songs
      WHERE playlist_id = $1
      AND song_id = $2
      `,
      [
        req.params.id,
        songId,
      ]
    );

    res.json({
      message: "Song removed from playlist",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed removing song",
    });
  }
};


// GET PLAYLIST SONGS
exports.getPlaylistSongs = async(req,res)=>{
  try {


  const result = await pool.query(
  `
  SELECT songs.*
  FROM songs
  JOIN playlist_songs
    ON songs.id = playlist_songs.song_id
  JOIN playlists
    ON playlists.id = playlist_songs.playlist_id
  WHERE playlist_songs.playlist_id = $1
    AND playlists.user_id = $2
  ORDER BY songs.id ASC
  `,
  [
    req.params.id,
    req.user.id,
  ]
);


    res.json(result.rows);


  } catch(err){

    console.error(err);

    res.status(500).json({
      message:"Failed fetching playlist songs"
    });

  }
};