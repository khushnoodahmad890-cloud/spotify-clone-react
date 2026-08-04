import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SongRow from "../components/SongRow";
import { getSongs } from "../services/songService";
import { usePlayer } from "../context/PlayerContext";
import type { Song } from "../types/song";

export default function Artist() {
  const { name } = useParams();

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    playQueue,
  } = usePlayer();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading Artist...
        </div>
      </div>
    );
  }

  const artistName = decodeURIComponent(name || "").toLowerCase();

  const artistSongs = songs.filter(
    (song) =>
      song.artist?.toLowerCase() === artistName
  );

  if (artistSongs.length === 0) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-4xl font-black">
          Artist not found
        </h1>
      </div>
    );
  }

  const artist = artistSongs[0];

  function handlePlayArtist() {
    playQueue(artistSongs);
  }

  return (
    <div className="space-y-10 text-white">

      {/* Hero */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-fuchsia-700
          via-purple-700
          to-indigo-700
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

          <img
            src={
              artist.cover ||
              "https://via.placeholder.com/300"
            }
            alt={artist.artist}
            className="
              w-40
              h-40
              sm:w-52
              sm:h-52
              lg:w-64
              lg:h-64
              rounded-full
              object-cover
              shadow-2xl
              border-4
              border-white/20
            "
          />

          <div className="flex-1">

            <p className="uppercase tracking-widest text-sm text-purple-200">
              Artist
            </p>

            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-black break-words">
              {artist.artist}
            </h1>

            <p className="mt-4 text-purple-100">
              {artistSongs.length} Song
              {artistSongs.length !== 1 && "s"}
            </p>

            <button
              onClick={handlePlayArtist}
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
              "
            >
              ▶ Play Artist
            </button>

          </div>

        </div>

      </section>

      {/* Songs */}

      <section>

        <h2 className="text-2xl font-bold mb-5">
          Popular Songs
        </h2>

        <div className="space-y-2">

          {artistSongs.map((song) => (

            <SongRow
              key={song.id}
              song={song}
            />

          ))}

        </div>

      </section>

    </div>
  );
}