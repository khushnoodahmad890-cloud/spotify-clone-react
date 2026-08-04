import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Song } from "../types/song";
import {
  getSongs,
  deleteSong,
} from "../services/songService";
import { useToast } from "../context/ToastContext";

export default function Admin() {

  const { showToast } = useToast();

  const [songs, setSongs] =
    useState<Song[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadSongs() {

    try {

      setLoading(true);

      const data =
        await getSongs();

      setSongs(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(id: number) {

    if (
      !window.confirm(
        "Delete this song?"
      )
    ) {
      return;
    }

    try {

      await deleteSong(id);

      await loadSongs();

      showToast("Song deleted", "success");

    } catch (err) {

      console.error(err);

      showToast(
        "Failed to delete song",
        "error"
      );

    }

  }

  useEffect(() => {

    loadSongs();

  }, []);

 return (

  <div className="space-y-8 text-white">

    {/* Header */}

    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
      "
    >

      <div>

        <p className="uppercase tracking-[4px] text-green-500 font-bold">
          Dashboard
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-2">
          Song Manager
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your music library, upload songs,
          edit metadata and organize your catalog.
        </p>

      </div>

      <Link
        to="/add-song"
        className="
          bg-green-500
          text-black
          px-6
          py-4
          rounded-2xl
          font-bold
          hover:scale-105
          transition
          shadow-lg
          text-center
        "
      >
        + Add New Song
      </Link>

    </div>

    {/* Stats */}

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >

      <div
        className="
          rounded-2xl
          bg-gradient-to-br
          from-green-700
          to-green-900
          p-6
          shadow-xl
        "
      >

        <p className="text-green-100">
          Total Songs
        </p>

        <h2 className="text-5xl font-black mt-3">
          {songs.length}
        </h2>

      </div>

      <div
        className="
          rounded-2xl
          bg-neutral-900
          border
          border-neutral-800
          p-6
        "
      >

        <p className="text-gray-400">
          Storage
        </p>

        <h2 className="text-4xl font-black mt-3">
          Cloud
        </h2>

      </div>

      <div
        className="
          rounded-2xl
          bg-neutral-900
          border
          border-neutral-800
          p-6
        "
      >

        <p className="text-gray-400">
          Server Status
        </p>

        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            bg-green-500/20
            text-green-400
            px-4
            py-2
            rounded-full
            font-semibold
          "
        >

          <span className="w-2 h-2 rounded-full bg-green-500" />

          Online

        </div>

      </div>

    </div>

      {loading ? (

        <div
  className="
    h-64
    flex
    items-center
    justify-center
    text-gray-400
    text-xl
  "
>
  Loading your music library...
</div>

      ) : songs.length === 0 ? (

        <div
  className="
    rounded-2xl
    border
    border-dashed
    border-neutral-700
    py-20
    text-center
  "
>

  <h2 className="text-2xl font-bold">
    No Songs Yet
  </h2>

  <p className="text-gray-400 mt-3">
    Upload your first song to start building
    your music library.
  </p>

</div>

      ) : (

        <>

         {/* Desktop Table */}

<div
  className="
    hidden
    lg:block
    rounded-3xl
    overflow-hidden
    border
    border-neutral-800
    bg-neutral-900
    shadow-xl
  "
>

  <table className="w-full">

    <thead className="bg-neutral-950">

      <tr>

        <th className="text-left p-5 font-semibold text-gray-400">
          Song
        </th>

        <th className="text-left font-semibold text-gray-400">
          Artist
        </th>

        <th className="text-left font-semibold text-gray-400">
          Album
        </th>

        <th className="text-center font-semibold text-gray-400">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {songs.map((song) => (

        <tr
          key={song.id}
          className="
            border-t
            border-neutral-800
            hover:bg-neutral-800/70
            transition
          "
        >

          <td className="p-5">

            <div className="flex items-center gap-4">

              <img
                src={
                  song.cover ||
                  "https://via.placeholder.com/100"
                }
                alt={song.title}
                className="
                  w-14
                  h-14
                  rounded-xl
                  object-cover
                  shadow-lg
                "
              />

              <div>

                <h3 className="font-bold">
                  {song.title}
                </h3>

                <p className="text-sm text-gray-400">
                  ID #{song.id}
                </p>

              </div>

            </div>

          </td>

          <td className="text-gray-300">
            {song.artist}
          </td>

          <td className="text-gray-400">
            {song.album}
          </td>

          <td>

            <div className="flex justify-center gap-3">

              <Link
                to={`/edit-song/${song.id}`}
                className="
                  bg-green-500
                  text-black
                  px-5
                  py-2
                  rounded-lg
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(song.id)
                }
                className="
                  bg-red-500
                  px-5
                  py-2
                  rounded-lg
                  font-semibold
                  hover:bg-red-600
                  transition
                "
              >
                Delete
              </button>

            </div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

         {/* Mobile Cards */}

<div className="lg:hidden space-y-5">

  {songs.map((song) => (

    <div
      key={song.id}
      className="
        rounded-2xl
        bg-neutral-900
        border
        border-neutral-800
        p-5
        shadow-lg
      "
    >

      <div className="flex gap-4">

        <img
          src={
            song.cover ||
            "https://via.placeholder.com/100"
          }
          alt={song.title}
          className="
            w-20
            h-20
            rounded-xl
            object-cover
            shadow-lg
          "
        />

        <div className="flex-1 min-w-0">

          <h3 className="font-bold text-lg truncate">
            {song.title}
          </h3>

          <p className="text-gray-400 truncate">
            {song.artist}
          </p>

          <p className="text-gray-500 text-sm truncate">
            {song.album}
          </p>

          <span
            className="
              inline-block
              mt-3
              bg-green-500/20
              text-green-400
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            "
          >
            ID #{song.id}
          </span>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">

        <Link
          to={`/edit-song/${song.id}`}
          className="
            bg-green-500
            text-black
            py-3
            rounded-xl
            font-bold
            text-center
            hover:scale-105
            transition
          "
        >
          Edit
        </Link>

        <button
          onClick={() =>
            handleDelete(song.id)
          }
          className="
            bg-red-500
            py-3
            rounded-xl
            font-bold
            hover:bg-red-600
            transition
          "
        >
          Delete
        </button>

      </div>

    </div>

  ))}

</div>

        </>

      )}

    </div>

  );

}