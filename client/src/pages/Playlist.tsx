import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePlaylists } from "../context/PlaylistContext";
import { usePlayer } from "../context/PlayerContext";
import { getSongs } from "../services/songService";

import SongRow from "../components/SongRow";
import type { Song } from "../types/song";

export default function Playlist() {
  const { id } = useParams();

  const {
    playlists,
    getPlaylistSongs,
    removeSongFromPlaylist,
  } = usePlaylists();

  const {
    playQueue,
  } = usePlayer();

  const [songs, setSongs] = useState<Song[]>([]);
  const [playlistIds, setPlaylistIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  const playlist = playlists.find(
    (p) => p.id === Number(id)
  );

  useEffect(() => {
    async function loadPlaylistSongs() {
      if (!playlist) return;

      try {
        const ids =
          await getPlaylistSongs(playlist.id);

        setPlaylistIds(ids);
      } catch (err) {
        console.error(err);
      }
    }

    loadPlaylistSongs();
  }, [playlist, getPlaylistSongs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading Playlist...
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-4xl font-black">
          Playlist not found
        </h1>
      </div>
    );
  }

  const playlistSongs = songs.filter((song) =>
    playlistIds.includes(song.id)
  );

  function handlePlayPlaylist() {
    if (playlistSongs.length === 0) return;

    playQueue(playlistSongs);
  }

  async function handleRemoveSong(songId: number) {
    if (!playlist) return;

    await removeSongFromPlaylist(
      playlist.id,
      songId
    );

    setPlaylistIds((prev) =>
      prev.filter((id) => id !== songId)
    );
  }

  return (
    <div className="space-y-10 text-white">

      {/* Hero */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-green-700
          via-emerald-600
          to-teal-600
          p-6
          sm:p-8
          lg:p-10
          shadow-xl
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-8
            items-center
            lg:items-end
            text-center
            lg:text-left
          "
        >

          <div
            className="
              w-40
              h-40
              sm:w-52
              sm:h-52
              lg:w-60
              lg:h-60
              rounded-3xl
              bg-gradient-to-br
              from-green-400
              to-green-700
              flex
              items-center
              justify-center
              text-6xl
              sm:text-7xl
              shadow-2xl
            "
          >
            🎵
          </div>

          <div className="flex-1">

            <p className="uppercase tracking-widest text-sm text-green-100">
              Playlist
            </p>

            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-black">
              {playlist.name}
            </h1>

            <p className="mt-4 text-green-100">
              {playlistSongs.length} Songs
            </p>

            <button
              onClick={handlePlayPlaylist}
              disabled={playlistSongs.length === 0}
              className="
                mt-6
                bg-white
                text-black
                px-8
                py-3
                rounded-full
                font-bold
                hover:scale-105
                transition
                disabled:opacity-50
              "
            >
              ▶ Play Playlist
            </button>

          </div>

        </div>

      </section>

      {/* Songs */}

      <section>

        <h2 className="text-2xl font-bold mb-5">
          Songs
        </h2>

        {playlistSongs.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900/50
              p-10
              text-center
            "
          >

            <div className="text-6xl mb-5">
              🎼
            </div>

            <h3 className="text-2xl font-bold">
              This playlist is empty
            </h3>

            <p className="text-gray-400 mt-3">
              Add songs from Home or Search.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {playlistSongs.map((song) => (

              <div
                key={song.id}
                className="
                  relative
                  rounded-xl
                  border
                  border-neutral-800
                  bg-neutral-900/40
                "
              >

                <SongRow
                  song={song}
                />

                <button
                  onClick={() =>
                    handleRemoveSong(song.id)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-red-500/15
                    px-4
                    py-2
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    transition
                  "
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}