import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useHistory } from "./HistoryContext";
import type { Song } from "../types/song";

type PlayerContextType = {
  currentSong: Song | null;
  isPlaying: boolean;

  currentTime: number;
  duration: number;

  queue: Song[];
  queueIndex: number;

  playSong: (song: Song) => void;
  playQueue: (songs: Song[], startIndex?: number) => void;

  togglePlay: () => void;

  nextSong: () => void;
  previousSong: () => void;

  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;

  likedSongs: number[];
  toggleLike: (songId: number) => void;

  shuffle: boolean;
  toggleShuffle: () => void;

  repeat: boolean;
  toggleRepeat: () => void;

  addToQueue: (song: Song) => void;

playNext: (song: Song) => void;

clearQueue: () => void;

recentlyPlayed: Song[];

clearRecentlyPlayed: () => void;

reorderQueue: (fromIndex: number, toIndex: number) => void;

removeFromQueue: (index: number) => void;

isMuted: boolean;

toggleMute: () => void;

};

const PlayerContext =
  createContext<PlayerContextType | null>(null);

export function PlayerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef = useRef(new Audio());

  const [queue, setQueue] =
    useState<Song[]>([]);

  const [queueIndex, setQueueIndex] =
    useState(0);

  const [currentSong, setCurrentSong] =
    useState<Song | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [shuffle, setShuffle] =
    useState(false);

  const [repeat, setRepeat] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const previousVolumeRef = useRef(1);

  const [likedSongs, setLikedSongs] =
    useState<number[]>(() => {
      const saved =
        localStorage.getItem("likedSongs");

      return saved
        ? JSON.parse(saved)
        : [];
    });

    const { addToHistory } = useHistory();

   const [recentlyPlayed, setRecentlyPlayed] =
    useState<Song[]>(() => {
     const saved = localStorage.getItem(
      "recentlyPlayed"
    );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  function playSong(song: Song) {
    const audio = audioRef.current;

    if (
      queue.length === 0 ||
      !queue.find((item) => item.id === song.id)
    ) {
      setQueue([song]);
      setQueueIndex(0);
    }

    audio.pause();
    audio.currentTime = 0;
    audio.src = song.audio;

    setCurrentSong(song);
    addToHistory(song);
    setRecentlyPlayed((prev) => {
  const updated = [
    song,
    ...prev.filter(
      (s) => s.id !== song.id
    ),
  ].slice(0, 20);

  localStorage.setItem(
    "recentlyPlayed",
    JSON.stringify(updated)
  );

  return updated;
});
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio failed:", err);
        setIsPlaying(false);
      });
  }

  function playQueue(
    songs: Song[],
    startIndex = 0
  ) {
    setQueue(songs);
    setQueueIndex(startIndex);

    if (songs.length > 0) {
      playSong(songs[startIndex]);
    }
  }

function addToQueue(song: Song) {
  setQueue((prev) => [...prev, song]);
}
function playNext(song: Song) {
  setQueue((prev) => {
    const updated = [...prev];

    updated.splice(queueIndex + 1, 0, song);

    return updated;
  });
}

function clearQueue() {
  if (!currentSong) {
    setQueue([]);
    setQueueIndex(0);
    return;
  }

  setQueue([currentSong]);
  setQueueIndex(0);
}

function reorderQueue(fromIndex: number, toIndex: number) {
  setQueue((prev) => {
    const updated = [...prev];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  });

  setQueueIndex((prevIndex) => {
    if (fromIndex === prevIndex) return toIndex;

    if (fromIndex < prevIndex && toIndex >= prevIndex) {
      return prevIndex - 1;
    }

    if (fromIndex > prevIndex && toIndex <= prevIndex) {
      return prevIndex + 1;
    }

    return prevIndex;
  });
}

function removeFromQueue(index: number) {
  setQueue((prev) => prev.filter((_, i) => i !== index));

  setQueueIndex((prevIndex) => {
    if (index < prevIndex) return prevIndex - 1;
    return prevIndex;
  });
}

  async function togglePlay() {
    const audio = audioRef.current;

    if (!currentSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function nextSong() {
    if (
      !currentSong ||
      queue.length === 0
    )
      return;

    if (repeat) {
      playSong(currentSong);
      return;
    }

    if (shuffle) {
      const random = Math.floor(
        Math.random() * queue.length
      );

      setQueueIndex(random);
      playSong(queue[random]);
      return;
    }

    const nextIndex =
      queueIndex + 1 >= queue.length
        ? 0
        : queueIndex + 1;

    setQueueIndex(nextIndex);
    playSong(queue[nextIndex]);
  }

  function previousSong() {
    if (
      !currentSong ||
      queue.length === 0
    )
      return;

    const previousIndex =
      queueIndex <= 0
        ? queue.length - 1
        : queueIndex - 1;

    setQueueIndex(previousIndex);
    playSong(queue[previousIndex]);
  }

  function seekTo(time: number) {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function setVolume(volume: number) {
    audioRef.current.volume = volume;

    if (volume > 0) {
      previousVolumeRef.current = volume;
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;

    if (isMuted) {
      const restored = previousVolumeRef.current || 1;
      audio.volume = restored;
      setIsMuted(false);
    } else {
      previousVolumeRef.current = audio.volume || 1;
      audio.volume = 0;
      setIsMuted(true);
    }
  }

  function toggleLike(songId: number) {
    setLikedSongs((prev) => {
      const updated = prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId];

      localStorage.setItem(
        "likedSongs",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

function clearRecentlyPlayed() {
  setRecentlyPlayed([]);

  localStorage.removeItem(
    "recentlyPlayed"
  );
}

  function toggleShuffle() {
    setShuffle((prev) => !prev);
  }

  function toggleRepeat() {
    setRepeat((prev) => !prev);
  }

  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "loadedmetadata",
      update
    );

    audio.addEventListener(
      "ended",
      nextSong
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "loadedmetadata",
        update
      );

      audio.removeEventListener(
        "ended",
        nextSong
      );
    };
  }, [
    queue,
    queueIndex,
    currentSong,
    shuffle,
    repeat,
  ]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,

        currentTime,
        duration,

        queue,
        queueIndex,

        playSong,
        playQueue,

        addToQueue,
        playNext,
        clearQueue,
        recentlyPlayed,

        clearRecentlyPlayed,
        togglePlay,

        nextSong,
        previousSong,

        seekTo,
        setVolume,

        reorderQueue,
        removeFromQueue,

        isMuted,
        toggleMute,

        likedSongs,
        toggleLike,

        shuffle,
        toggleShuffle,

        repeat,
        toggleRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context =
    useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayer must be used inside PlayerProvider"
    );
  }

  return context;
}