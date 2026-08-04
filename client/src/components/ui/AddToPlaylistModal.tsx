import { useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext";
import { useToast } from "../../context/ToastContext";

type Props = {
  songId: number;
  onClose: () => void;
};

export default function AddToPlaylistModal({
  songId,
  onClose,
}: Props) {
  const {
    playlists,
    addSongToPlaylist,
  } = usePlaylists();

  const { showToast } = useToast();

  const [loading, setLoading] =
    useState(false);

  async function handleAdd(
    playlistId: number
  ) {
    try {
      setLoading(true);

      await addSongToPlaylist(
        playlistId,
        songId
      );

      showToast("Added to playlist", "success");

      onClose();

    } catch (err) {

      console.error(err);

      showToast("Failed to add song to playlist", "error");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-neutral-900 rounded-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-5">
          Add to Playlist
        </h2>

        {playlists.length === 0 ? (

          <p className="text-gray-400">
            Create a playlist first.
          </p>

        ) : (

          <div className="space-y-3">

            {playlists.map((playlist) => (

              <button
                key={playlist.id}
                disabled={loading}
                onClick={() =>
                  handleAdd(
                    playlist.id
                  )
                }
                className="
                  w-full
                  text-left
                  bg-neutral-800
                  hover:bg-neutral-700
                  rounded-lg
                  p-3
                  transition
                  disabled:opacity-50
                "
              >
                {playlist.name}
              </button>

            ))}

          </div>

        )}

        <button
          onClick={onClose}
          disabled={loading}
          className="
            mt-6
            w-full
            bg-red-500
            rounded-lg
            py-2
            disabled:opacity-50
          "
        >
          Cancel
        </button>

      </div>

    </div>
  );
}