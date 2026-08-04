import { useEffect, useState } from "react";

import { usePlayer } from "../context/PlayerContext";
import { getSongs } from "../services/songService";

import SongRow from "../components/SongRow";
import type { Song } from "../types/song";

export default function Library() {
  const {
    likedSongs,
    playQueue,
  } = usePlayer();

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (err) {
        console.error(
          "Failed loading songs:",
          err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-300">
            Loading your library...
          </p>
        </div>
      </div>
    );
  }

  const likedSongsList = songs.filter(
    (song) =>
      likedSongs.includes(song.id)
  );

  function handlePlayLikedSongs() {
    if (likedSongsList.length === 0) return;

    playQueue(likedSongsList);
  }

  return (
    <div className="space-y-10 text-white">

      {/* Header */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-purple-700
          via-indigo-600
          to-blue-600
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
            items-center
            lg:items-end
            gap-8
            text-center
            lg:text-left
          "
        >

          <div
            className="
              w-36
              h-36
              sm:w-44
              sm:h-44
              lg:w-56
              lg:h-56
              rounded-3xl
              bg-gradient-to-br
              from-purple-500
              to-pink-500
              flex
              items-center
              justify-center
              text-5xl
              sm:text-6xl
              lg:text-7xl
              shadow-2xl
            "
          >
            ❤️
          </div>

          <div className="flex-1">

            <p className="uppercase tracking-widest text-xs text-purple-200">
              Playlist
            </p>

            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black">
              Liked Songs
            </h1>

            <p className="mt-4 text-sm sm:text-base text-purple-100">
              Your favourite songs all in one place.
            </p>

            <p className="mt-2 text-gray-200">
              {likedSongsList.length} song
              {likedSongsList.length !== 1 && "s"}
            </p>

            <button
              onClick={handlePlayLikedSongs}
              disabled={
                likedSongsList.length === 0
              }
              className="
                mt-6
                bg-green-500
                hover:bg-green-400
                text-black
                font-bold
                px-8
                py-3
                rounded-full
                transition
                hover:scale-105
                disabled:opacity-50
                disabled:hover:scale-100
                w-full
                sm:w-auto
              "
            >
              ▶ Play All
            </button>

          </div>

        </div>

      </section>

      {/* Songs */}

      <section>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Your Library
        </h2>

        {likedSongsList.length === 0 ? (

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
              🎵
            </div>

            <h3 className="text-2xl font-bold">
              No liked songs yet
            </h3>

            <p className="mt-3 text-gray-400 max-w-md mx-auto">
              Tap the heart while listening to songs
              and they'll appear here automatically.
            </p>

          </div>

        ) : (

          <div className="space-y-2 overflow-hidden">

            {likedSongsList.map((song) => (

              <SongRow
                key={song.id}
                song={song}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}