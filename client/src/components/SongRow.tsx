import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Song } from "../types/song";
import { usePlayer } from "../context/PlayerContext";
import SongMenu from "./ui/SongMenu";

type Props = {
  song: Song;
};

function formatDuration(seconds?: number) {
  if (!seconds) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${minutes}:${remaining
    .toString()
    .padStart(2, "0")}`;
}

export default function SongRow({
  song,
}: Props) {
 const {
  playSong,
  currentSong,
} = usePlayer();
const navigate = useNavigate();
  const [showMenu, setShowMenu] =
    useState(false);

  const isCurrent =
    currentSong?.id === song.id;

  return (
    <>
      <div
        className={`
          grid
          grid-cols-[36px_52px_1fr_42px]
          md:grid-cols-[40px_80px_1fr_100px_60px_40px]
          items-center
          gap-2
          md:gap-4
          p-2
          md:p-4
          rounded-lg
          transition
          ${
            isCurrent
              ? "bg-neutral-800"
              : "hover:bg-neutral-800"
          }
        `}
      >
        {/* Play */}

       <button
  onClick={() => {
    playSong(song);
    navigate("/now-playing");
  }}
  className="
    text-base
    md:text-lg
    hover:text-green-500
    transition
  "
>
  ▶
</button>

        {/* Cover */}

       <img
  src={song.cover || "https://via.placeholder.com/100"}
  alt={song.title}
  onClick={() => {
    playSong(song);
    navigate("/now-playing");
  }}
  className="
    w-10
    h-10
    md:w-14
    md:h-14
    rounded-md
    object-cover
    cursor-pointer
  "
/>
        

        {/* Info */}

        <div className="min-w-0">
          <h3
  onClick={() => {
    playSong(song);
    navigate("/now-playing");
  }}
  className="
    font-semibold
    text-sm
    md:text-base
    truncate
    cursor-pointer
    hover:text-green-400
  "
>
  {song.title}
</h3>

          <p
            className="
              text-xs
              md:text-sm
              text-gray-400
              truncate
            "
          >
            <Link
              to={`/artist/${encodeURIComponent(
                song.artist
              )}`}
              className="hover:text-white"
            >
              {song.artist}
            </Link>

            <span className="hidden sm:inline">
              {" • "}

              <Link
                to={`/album/${encodeURIComponent(
                  song.album
                )}`}
                className="hover:text-white"
              >
                {song.album}
              </Link>
            </span>
          </p>
        </div>

        {/* Desktop Duration */}

        <span
          className="
            hidden
            md:block
            text-gray-400
            text-sm
          "
        >
          {formatDuration(song.duration)}
        </span>

        {/* Mobile Duration */}

        <span
          className="
            md:hidden
            text-gray-400
            text-[11px]
          "
        >
          {formatDuration(song.duration)}
        </span>

        {/* Menu */}

        <button
          onClick={() =>
            setShowMenu(true)
          }
          className="
            hover:text-green-500
            transition
            flex
            justify-center
          "
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {showMenu && (
        <SongMenu
          song={song}
          onClose={() =>
            setShowMenu(false)
          }
        />
      )}
    </>
  );
}