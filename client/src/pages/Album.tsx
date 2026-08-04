import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SongRow from "../components/SongRow";
import { getSongs } from "../services/songService";
import { usePlayer } from "../context/PlayerContext";
import type { Song } from "../types/song";

export default function Album() {
  const { id } = useParams();

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const { playQueue } = usePlayer();

  useEffect(() => {
    async function fetchSongs() {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (err) {
        console.error("Failed to load songs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-2xl">
        Loading album...
      </div>
    );
  }

  const albumName = decodeURIComponent(id || "").toLowerCase();

  const albumSongs = songs.filter(
    (song) => song.album?.toLowerCase() === albumName
  );

  if (albumSongs.length === 0) {
    return (
      <div className="text-white text-2xl">
        Album not found
      </div>
    );
  }

  const album = albumSongs[0];

  function handlePlayAlbum() {
    playQueue(albumSongs);
  }

  return (
    <div className="space-y-10 text-white">

      {/* Header */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-green-600 to-green-500 p-8 md:p-12 shadow-2xl">

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-end">

          <img
            src={
              album.cover ||
              "https://via.placeholder.com/300"
            }
            alt={album.album}
            className="
              w-48
              h-48
              md:w-64
              md:h-64
              rounded-2xl
              object-cover
              shadow-2xl
            "
          />

          <div className="text-center md:text-left">

            <p className="uppercase tracking-[4px] text-green-100 text-sm">
              Album
            </p>

            <h1 className="text-4xl md:text-6xl font-black mt-2">
              {album.album}
            </h1>

            <p className="text-green-100 text-xl mt-3">
              {album.artist}
            </p>

            <p className="text-green-200 mt-2">
              {albumSongs.length} song
              {albumSongs.length > 1 ? "s" : ""}
            </p>

            <button
              onClick={handlePlayAlbum}
              className="
                mt-8
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
              ▶ Play Album
            </button>

          </div>

        </div>

      </section>

      {/* Songs */}

      <section>

        <h2 className="text-2xl font-bold mb-5">
          Tracks
        </h2>

        <div className="space-y-2">
          {albumSongs.map((song) => (
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