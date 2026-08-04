import {
  Heart,
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Repeat,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

export default function Player() {
  const navigate = useNavigate();

  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    isMuted,
    toggleMute,
    likedSongs,
    toggleLike,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    queue,
    queueIndex,
  } = usePlayer();

  const [volume, setVolumeState] = useState(1);

  // Global keyboard shortcuts: space = play/pause, arrows = seek/volume,
  // m = mute, n/p = next/prev, l = like current song
  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      const el = target as HTMLElement | null;
      return (
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      );
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      if (!currentSong) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          seekTo(Math.min(duration, currentTime + 5));
          break;
        case "ArrowLeft":
          e.preventDefault();
          seekTo(Math.max(0, currentTime - 5));
          break;
        case "ArrowUp": {
          e.preventDefault();
          const next = Math.min(1, volume + 0.1);
          setVolumeState(next);
          setVolume(next);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          const next = Math.max(0, volume - 0.1);
          setVolumeState(next);
          setVolume(next);
          break;
        }
        case "m":
        case "M":
          toggleMute();
          break;
        case "n":
        case "N":
          nextSong();
          break;
        case "p":
        case "P":
          previousSong();
          break;
        case "l":
        case "L":
          toggleLike(currentSong.id);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentSong,
    currentTime,
    duration,
    volume,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    nextSong,
    previousSong,
    toggleLike,
  ]);

  if (!currentSong) {
    return (
      <footer
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          h-24
          bg-black/80
          backdrop-blur-xl
          border-t
          border-neutral-800
          flex
          items-center
          justify-center
          text-gray-500
        "
      >
        🎵 Select a song to start listening
      </footer>
    );
  }

  function formatTime(time: number) {
    if (!time || Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function handleVolume(value: number) {
    setVolumeState(value);
    setVolume(value);
  }

  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-black/80
        backdrop-blur-2xl
        border-t
        border-white/10
        px-3
        md:px-6
        py-3
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
      "
    >
      {/* Left */}

      <div
        className="
          flex
          items-center
          gap-4
          w-full
          md:w-1/4
        "
      >
        <div
          onClick={() => navigate("/now-playing")}
          className="
            relative
            cursor-pointer
            group
          "
        >
          {isPlaying && (
            <div
              className="
                absolute
                -inset-2
                rounded-xl
                bg-green-500/30
                blur-xl
              "
            />
          )}

          <img
            src={
              currentSong.cover ||
              "https://via.placeholder.com/100"
            }
            alt={currentSong.title}
            className={`
              relative
              w-14
              h-14
              rounded-xl
              object-cover
              shadow-xl
              transition-all
              group-hover:scale-105
              ${
                isPlaying
                  ? "animate-spin-slow"
                  : ""
              }
            `}
            style={{
              animationDuration: "12s",
            }}
          />
        </div>

        <div className="min-w-0 flex-1">

          <h3
            className={`
              font-bold
              truncate
              ${
                isPlaying
                  ? "text-green-400"
                  : "text-white"
              }
            `}
          >
            {currentSong.title}
          </h3>

          <p className="text-sm text-gray-400 truncate">
            {currentSong.artist}
          </p>

          <p className="text-xs text-gray-500">
            Song {queueIndex + 1} of {queue.length}
          </p>

        </div>

        <button
          onClick={() =>
            toggleLike(currentSong.id)
          }
          className="
            hover:scale-110
            transition
          "
        >
          <Heart
            size={20}
            fill={
              likedSongs.includes(currentSong.id)
                ? "#22c55e"
                : "none"
            }
            color="#22c55e"
          />
        </button>

      </div>

    {/* Center */}

<div
  className="
    flex
    flex-col
    items-center
    justify-center
    w-full
    md:w-2/4
  "
>

  {/* Controls */}

  <div className="flex items-center gap-6 mb-3">

    <button
      onClick={toggleShuffle}
      className="
        transition
        hover:scale-110
      "
    >
      <Shuffle
        size={20}
        className={
          shuffle
            ? "text-green-500"
            : "text-gray-500"
        }
      />
    </button>

    <button
      onClick={previousSong}
      className="
        hover:text-white
        transition
      "
    >
      <SkipBack size={26} />
    </button>

    <button
      onClick={togglePlay}
      className="
        w-14
        h-14
        rounded-full
        bg-white
        text-black
        flex
        items-center
        justify-center
        hover:scale-110
        transition
        shadow-xl
      "
    >
      {isPlaying ? (
        <Pause
          size={24}
          fill="black"
          color="black"
        />
      ) : (
        <Play
          size={24}
          fill="black"
          color="black"
        />
      )}
    </button>

    <button
      onClick={nextSong}
      className="
        hover:text-white
        transition
      "
    >
      <SkipForward size={26} />
    </button>

    <button
      onClick={toggleRepeat}
      className="
        transition
        hover:scale-110
      "
    >
      <Repeat
        size={20}
        className={
          repeat
            ? "text-green-500"
            : "text-gray-500"
        }
      />
    </button>

  </div>

  {/* Progress */}

  <div
    className="
      flex
      items-center
      gap-3
      w-full
      max-w-2xl
    "
  >

    <span
      className="
        text-xs
        text-gray-400
        w-10
      "
    >
      {formatTime(currentTime)}
    </span>

    <input
      type="range"
      min={0}
      max={duration || 0}
      value={currentTime}
      onChange={(e) =>
        seekTo(Number(e.target.value))
      }
      className="
        flex-1
        h-1.5
        accent-green-500
        cursor-pointer
      "
    />

    <span
      className="
        text-xs
        text-gray-400
        w-10
      "
    >
      {formatTime(duration)}
    </span>

  </div>

</div>

{/* Right */}

<div
  className="
    hidden
    md:flex
    items-center
    justify-end
    gap-4
    w-1/4
  "
>

  <button
    onClick={() => toggleMute()}
    title={isMuted ? "Unmute (m)" : "Mute (m)"}
    className="text-gray-400 hover:text-white transition"
  >
    {isMuted || volume === 0 ? (
      <VolumeX size={18} />
    ) : (
      <Volume2 size={18} />
    )}
  </button>

  <input
    type="range"
    min={0}
    max={1}
    step={0.01}
    value={isMuted ? 0 : volume}
    onChange={(e) =>
      handleVolume(Number(e.target.value))
    }
    className="
      w-32
      accent-green-500
      cursor-pointer
    "
  />

</div>

</footer>
);
}