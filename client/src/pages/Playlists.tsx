import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePlaylists } from "../context/PlaylistContext";
import { useToast } from "../context/ToastContext";

export default function Playlists() {
  const navigate = useNavigate();

  const {
    playlists,
    createPlaylist,
    deletePlaylist,
  } = usePlaylists();

  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await createPlaylist(name);

      showToast(`Playlist "${name}" created`, "success");

      setName("");

    } catch (err) {
      console.error(err);
      showToast("Failed to create playlist", "error");

    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete playlist?")) {
      return;
    }

    try {
      await deletePlaylist(id);

      showToast("Playlist deleted", "success");

    } catch (err) {
      console.error(err);
      showToast("Failed to delete playlist", "error");
    }
  }

  return (
    <div className="space-y-10 text-white">

      {/* Header */}

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

        <h1 className="text-3xl sm:text-5xl font-black">
          Your Playlists
        </h1>

        <p className="mt-3 text-green-100 text-sm sm:text-base">
          Create and organize your own music collections.
        </p>

      </section>

      {/* Create Playlist */}

      <section
        className="
          rounded-2xl
          border
          border-neutral-800
          bg-neutral-900/50
          p-6
          space-y-5
        "
      >

        <h2 className="text-xl font-bold">
          Create Playlist
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter playlist name..."
          className="
            w-full
            rounded-xl
            border
            border-neutral-700
            bg-neutral-800
            px-5
            py-4
            outline-none
            transition
            focus:border-green-500
            focus:ring-2
            focus:ring-green-500/30
          "
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="
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
          {loading
            ? "Creating..."
            : "Create Playlist"}
        </button>

      </section>

      {/* Playlist List */}

      <section>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Your Collections
        </h2>

        {playlists.length === 0 ? (

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

            <div className="text-6xl mb-4">
              🎵
            </div>

            <h3 className="text-2xl font-bold">
              No playlists yet
            </h3>

            <p className="mt-3 text-gray-400">
              Create your first playlist above.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {playlists.map((playlist) => (

              <div
                key={playlist.id}
                className="
                  rounded-2xl
                  border
                  border-neutral-800
                  bg-neutral-900/50
                  p-5
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  hover:bg-neutral-800/70
                  transition
                "
              >

                <button
                  onClick={() =>
                    navigate(`/playlist/${playlist.id}`)
                  }
                  className="
                    text-left
                    text-lg
                    font-bold
                    hover:text-green-400
                    transition
                  "
                >
                  🎶 {playlist.name}
                </button>

                <button
                  onClick={() =>
                    handleDelete(playlist.id)
                  }
                  className="
                    rounded-full
                    bg-red-500/15
                    px-5
                    py-2
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    transition
                    self-start
                    sm:self-auto
                  "
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}