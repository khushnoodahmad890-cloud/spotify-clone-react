import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";
import {
  Music,
  PlayCircle,
  Clock3,
  GripVertical,
  X,
} from "lucide-react";

export default function Queue() {
  const {
    currentSong,
    queue,
    queueIndex,
    playQueue,
    reorderQueue,
    removeFromQueue,
  } = usePlayer();

  const { showToast } = useToast();

  const upcoming = queue.slice(queueIndex + 1);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // `upcoming` indices map to real queue indices offset by (queueIndex + 1)
  function toQueueIndex(upcomingIndex: number) {
    return queueIndex + 1 + upcomingIndex;
  }

  function handleDragStart(upcomingIndex: number) {
    setDraggedIndex(upcomingIndex);
  }

  function handleDragOver(
    e: React.DragEvent,
    upcomingIndex: number
  ) {
    e.preventDefault();
    setDragOverIndex(upcomingIndex);
  }

  function handleDrop(upcomingIndex: number) {
    if (draggedIndex === null || draggedIndex === upcomingIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    reorderQueue(
      toQueueIndex(draggedIndex),
      toQueueIndex(upcomingIndex)
    );

    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleRemove(
    e: React.MouseEvent,
    upcomingIndex: number,
    title: string
  ) {
    e.stopPropagation();
    removeFromQueue(toQueueIndex(upcomingIndex));
    showToast(`Removed "${title}" from queue`, "info");
  }

  function formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="space-y-10 text-white">

      {/* Hero */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-green-500
          via-green-700
          to-black
          p-6
          md:p-10
        "
      >
        <div className="flex items-center gap-4">

          <Music
            size={42}
            className="text-white"
          />

          <div>

            <h1 className="text-4xl md:text-6xl font-black">
              Queue
            </h1>

            <p className="text-green-100 mt-2">
              Your upcoming listening session.
            </p>

          </div>

        </div>
      </section>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="bg-neutral-900 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">
            Now Playing
          </p>

          <h2 className="text-3xl font-black mt-2">
            {currentSong ? "1" : "0"}
          </h2>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">
            Up Next
          </p>

          <h2 className="text-3xl font-black mt-2">
            {upcoming.length}
          </h2>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">
            Total Queue
          </p>

          <h2 className="text-3xl font-black mt-2">
            {queue.length}
          </h2>
        </div>

      </div>

      {/* Current Song */}

      {currentSong && (

        <section className="bg-neutral-900 rounded-2xl p-6">

          <div className="flex items-center gap-6">

            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="
                w-28
                h-28
                rounded-xl
                object-cover
                shadow-xl
              "
            />

            <div className="flex-1">

              <p className="text-green-500 font-semibold mb-2">
                NOW PLAYING
              </p>

              <h2 className="text-3xl font-black">
                {currentSong.title}
              </h2>

              <p className="text-gray-400 mt-1">
                {currentSong.artist}
              </p>

              <div className="flex items-center gap-2 mt-4 text-gray-500">

                <Clock3 size={16} />

                {formatTime(currentSong.duration)}

              </div>

            </div>

          </div>

        </section>

      )}

      {/* Up Next */}

      <section>

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Up Next
          </h2>

          {upcoming.length > 1 && (
            <p className="text-sm text-gray-500 hidden sm:block">
              Drag <GripVertical size={14} className="inline -mt-0.5" /> to
              reorder
            </p>
          )}

        </div>

        {upcoming.length === 0 ? (

          <div
            className="
              bg-neutral-900
              rounded-2xl
              py-16
              text-center
            "
          >

            <Music
              size={60}
              className="mx-auto text-gray-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Queue is empty
            </h3>

            <p className="text-gray-400 mt-2">
              Add songs to continue listening.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {upcoming.map((song, index) => (

              <div
                key={`${song.id}-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => {
                  setDraggedIndex(null);
                  setDragOverIndex(null);
                }}
                onClick={() =>
                  playQueue(
                    queue,
                    queueIndex + index + 1
                  )
                }
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  sm:gap-5
                  bg-neutral-900
                  rounded-2xl
                  p-4
                  cursor-pointer
                  hover:bg-neutral-800
                  transition
                  ${
                    draggedIndex === index
                      ? "opacity-40"
                      : ""
                  }
                  ${
                    dragOverIndex === index &&
                    draggedIndex !== index
                      ? "drag-over"
                      : ""
                  }
                `}
              >

                <div
                  className="
                    text-gray-600
                    cursor-grab
                    active:cursor-grabbing
                    hidden
                    sm:block
                  "
                >
                  <GripVertical size={18} />
                </div>

                <div
                  className="
                    w-8
                    sm:w-10
                    text-center
                    text-gray-500
                    font-bold
                  "
                >
                  {index + 1}
                </div>

                <img
                  src={song.cover}
                  alt={song.title}
                  className="
                    w-16
                    h-16
                    rounded-lg
                    object-cover
                  "
                />

                <div className="flex-1 min-w-0">

                  <h3
                    className="
                      font-bold
                      truncate
                      group-hover:text-green-400
                      transition
                    "
                  >
                    {song.title}
                  </h3>

                  <p className="text-gray-400 text-sm truncate">
                    {song.artist}
                  </p>

                </div>

                <div className="text-gray-500 text-sm hidden sm:block">
                  {formatTime(song.duration)}
                </div>

                <PlayCircle
                  size={24}
                  className="
                    text-green-500
                    opacity-0
                    group-hover:opacity-100
                    transition
                    hidden
                    sm:block
                  "
                />

                <button
                  onClick={(e) =>
                    handleRemove(e, index, song.title)
                  }
                  title="Remove from queue"
                  className="
                    text-gray-600
                    hover:text-red-500
                    transition
                    shrink-0
                  "
                >
                  <X size={18} />
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}