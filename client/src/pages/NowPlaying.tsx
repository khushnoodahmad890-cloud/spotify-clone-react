import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Mic2,
  AudioWaveform,
} from "lucide-react";

import { useState } from "react";
import Waveform from "../components/player/Waveform";
import { usePlayer } from "../context/PlayerContext";

export default function NowPlaying() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    likedSongs,
    toggleLike,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    currentTime,
    duration,
    seekTo,
    queue,
    queueIndex,
    playQueue,
  } = usePlayer();

  const [showLyrics, setShowLyrics] = useState(false);

  if (!currentSong) {
    return (
      <div className="h-full flex items-center justify-center text-white text-lg sm:text-xl px-6 text-center">
        No song is currently playing.
      </div>
    );
  }

  const upcoming = queue.slice(queueIndex + 1);

  function formatTime(time: number) {
    if (!time || Number.isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${currentSong.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(100px)",
          transform: "scale(1.4)",
          opacity: 0.35,
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      {/* pb-40 / pb-28 reserves space so the fixed bottom mini-player
          doesn't overlap the Up Next list on small screens */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 pb-40 sm:pb-32 md:pb-8">

        <div className="grid lg:grid-cols-[360px_1fr] gap-8 md:gap-10 lg:gap-14">

          {/* LEFT */}

          <div>

            <div className="relative max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0">

              <div
                className={`
                  absolute
                  -inset-4
                  sm:-inset-6
                  rounded-full
                  blur-3xl
                  bg-green-500/50
                  ${
                    isPlaying
                      ? "animate-pulse-glow"
                      : ""
                  }
                `}
              />

              <div
                className={`
                  relative
                  rounded-2xl
                  sm:rounded-3xl
                  overflow-hidden
                  shadow-[0_0_80px_rgba(34,197,94,.35)]
                  ${
                    isPlaying
                      ? "animate-spin-slow"
                      : ""
                  }
                `}
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="
                    w-full
                    aspect-square
                    rounded-2xl
                    sm:rounded-3xl
                    object-cover
                    shadow-[0_0_80px_rgba(34,197,94,0.35)]
                  "
                />
              </div>

            </div>

            <div className="mt-6 sm:mt-8 text-center lg:text-left">

              <p className="uppercase tracking-[3px] sm:tracking-[6px] text-green-400 font-bold text-xs sm:text-sm">
                NOW PLAYING
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-2 sm:mt-4 leading-tight break-words">
                {currentSong.title}
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-3 mt-4 sm:mt-5">

                <div>
                  <p className="text-lg sm:text-xl font-semibold">
                    {currentSong.artist}
                  </p>

                  <p className="text-gray-400 text-sm sm:text-base">
                    {currentSong.album}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col justify-center">

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                {showLyrics ? "Lyrics" : "Now Playing"}
              </span>

              <button
                onClick={() => setShowLyrics((prev) => !prev)}
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  sm:text-sm
                  font-semibold
                  px-3
                  py-1.5
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                  text-gray-300
                "
              >
                {showLyrics ? (
                  <>
                    <AudioWaveform size={16} />
                    Show Player
                  </>
                ) : (
                  <>
                    <Mic2 size={16} />
                    Lyrics
                  </>
                )}
              </button>
            </div>

            {showLyrics ? (
              <div
                className="
                  h-36
                  overflow-y-auto
                  rounded-xl
                  bg-neutral-900
                  px-5
                  py-4
                  text-gray-200
                  leading-relaxed
                  whitespace-pre-line
                "
              >
                {currentSong.lyrics?.trim() ? (
                  currentSong.lyrics
                ) : (
                  <span className="text-gray-500">
                    No lyrics available for this song yet.
                  </span>
                )}
              </div>
            ) : (
              <Waveform />
            )}

            <div className="flex justify-center items-center gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10">

              <button onClick={toggleShuffle}>
                <Shuffle
                  size={20}
                  className={`sm:hidden ${
                    shuffle
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                />
                <Shuffle
                  size={24}
                  className={`hidden sm:block ${
                    shuffle
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                />
              </button>

              <button onClick={previousSong}>
                <SkipBack size={28} className="sm:hidden" />
                <SkipBack size={34} className="hidden sm:block" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition shrink-0"
              >
                {isPlaying ? (
                  <Pause
                    size={28}
                    fill="black"
                    color="black"
                    className="sm:hidden"
                  />
                ) : (
                  <Play
                    size={28}
                    fill="black"
                    color="black"
                    className="sm:hidden"
                  />
                )}
                {isPlaying ? (
                  <Pause
                    size={34}
                    fill="black"
                    color="black"
                    className="hidden sm:block"
                  />
                ) : (
                  <Play
                    size={34}
                    fill="black"
                    color="black"
                    className="hidden sm:block"
                  />
                )}
              </button>

              <button onClick={nextSong}>
                <SkipForward size={28} className="sm:hidden" />
                <SkipForward size={34} className="hidden sm:block" />
              </button>

              <button onClick={toggleRepeat}>
                <Repeat
                  size={20}
                  className={`sm:hidden ${
                    repeat
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                />
                <Repeat
                  size={24}
                  className={`hidden sm:block ${
                    repeat
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                />
              </button>

              <button
                onClick={() =>
                  toggleLike(currentSong.id)
                }
              >
                <Heart
                  size={20}
                  className="sm:hidden"
                  fill={
                    likedSongs.includes(
                      currentSong.id
                    )
                      ? "#22c55e"
                      : "none"
                  }
                  color="#22c55e"
                />
                <Heart
                  size={24}
                  className="hidden sm:block"
                  fill={
                    likedSongs.includes(
                      currentSong.id
                    )
                      ? "#22c55e"
                      : "none"
                  }
                  color="#22c55e"
                />
              </button>

            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-10">

              <span className="w-8 sm:w-10 text-xs sm:text-sm">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) =>
                  seekTo(Number(e.target.value))
                }
                className="flex-1 accent-green-500"
              />

              <span className="w-8 sm:w-10 text-xs sm:text-sm">
                {formatTime(duration)}
              </span>

            </div>

            <p className="hidden md:block text-center lg:text-left text-xs text-gray-500 mt-4">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                space
              </kbd>{" "}
              play/pause ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                ← →
              </kbd>{" "}
              seek ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                ↑ ↓
              </kbd>{" "}
              volume ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                m
              </kbd>{" "}
              mute ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                n
              </kbd>{" "}
              /{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                p
              </kbd>{" "}
              next/prev ·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                l
              </kbd>{" "}
              like
            </p>

            <div className="mt-10 sm:mt-14">

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                Up Next
              </h2>

              {upcoming.length === 0 ? (

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
                  Queue is empty
                </div>

              ) : (

                <div className="space-y-3 sm:space-y-4">

                  {upcoming.map((song, index) => (

                    <div
                      key={song.id}
                      onClick={() =>
                        playQueue(
                          queue,
                          queueIndex + index + 1
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        sm:gap-5
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-md
                        p-3
                        sm:p-4
                        hover:bg-white/10
                        transition-all
                        cursor-pointer
                      "
                    >

                      <img
                        src={song.cover}
                        alt={song.title}
                        className="
                          w-12
                          h-12
                          sm:w-16
                          sm:h-16
                          rounded-xl
                          object-cover
                          shrink-0
                        "
                      />

                      <div className="flex-1 min-w-0">

                        <h3 className="font-bold truncate text-sm sm:text-base">
                          {song.title}
                        </h3>

                        <p className="text-gray-400 truncate text-xs sm:text-sm">
                          {song.artist}
                        </p>

                      </div>

                      <button
                        className="
                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          rounded-full
                          bg-green-500
                          text-black
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <Play
                          size={16}
                          fill="black"
                        />
                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}