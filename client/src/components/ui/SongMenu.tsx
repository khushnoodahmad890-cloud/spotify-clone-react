import { useState } from "react";
import {
  Heart,
  Plus,
  ListMusic,
  Play,
  X,
} from "lucide-react";

import { usePlayer } from "../../context/PlayerContext";
import { usePlaylists } from "../../context/PlaylistContext";
import { useToast } from "../../context/ToastContext";

import type { Song } from "../../types/song";

type Props = {
  song: Song;
  onClose: () => void;
};

export default function SongMenu({
  song,
  onClose,
}: Props) {
  const {
    likedSongs,
    toggleLike,
    addToQueue,
    playNext,
  } = usePlayer();

  const {
    playlists,
    addSongToPlaylist,
  } = usePlaylists();

  const { showToast } = useToast();

  const [showPlaylists, setShowPlaylists] =
    useState(false);

  const liked =
    likedSongs.includes(song.id)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-neutral-900 rounded-xl w-80 p-4 space-y-2">

        <button
          onClick={() => {
            toggleLike(song.id);
            showToast(
              liked ? "Removed from Liked Songs" : "Added to Liked Songs",
              "success"
            );
            onClose();
          }}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-800"
        >
          <Heart
            size={20}
            className={
              liked
                ? "fill-green-500 text-green-500"
                : ""
            }
          />
          {liked ? "Unlike" : "Like"}
        </button>

        <button
          onClick={() =>
            setShowPlaylists(
              !showPlaylists
            )
          }
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-800"
        >
          <Plus size={20} />
          Add to Playlist
        </button>

        {showPlaylists && (

          <div className="ml-8 space-y-2">

            {playlists.map((playlist) => (

              <button
                key={playlist.id}
                onClick={async () => {
                  await addSongToPlaylist(
                    playlist.id,
                    song.id
                  );

                  showToast(
                    `Added to ${playlist.name}`,
                    "success"
                  );

                  onClose();
                }}
                className="block w-full text-left p-2 rounded hover:bg-neutral-800"
              >
                {playlist.name}
              </button>

            ))}

          </div>

        )}

        <button
          onClick={() => {
          addToQueue(song);
          showToast(`Added "${song.title}" to queue`, "success");

            onClose();
          }}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-800"
        >
          <ListMusic size={20} />
          Add to Queue
        </button>

        <button
          onClick={() => {
         playNext(song);
         showToast(`"${song.title}" will play next`, "success");

            onClose();
          }}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-800"
        >
          <Play size={20} />
          Play Next
        </button>

        <hr className="border-neutral-800" />

        <button
          onClick={onClose}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600"
        >
          <X size={20} />
          Cancel
        </button>

      </div>

    </div>
  );
}