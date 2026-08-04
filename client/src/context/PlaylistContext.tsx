import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getPlaylists,
  createPlaylist as apiCreatePlaylist,
  deletePlaylist as apiDeletePlaylist,
  addSongToPlaylist as apiAddSongToPlaylist,
  removeSongFromPlaylist as apiRemoveSongFromPlaylist,
  getPlaylistSongs as apiGetPlaylistSongs,
} from "../services/playlistService";

type Playlist = {
  id: number;
  name: string;
};

type PlaylistContextType = {
  playlists: Playlist[];

  createPlaylist: (
    name: string
  ) => Promise<void>;

  deletePlaylist: (
    id: number
  ) => Promise<void>;

  addSongToPlaylist: (
    playlistId: number,
    songId: number
  ) => Promise<void>;

  getPlaylistSongs: (
    playlistId: number
  ) => Promise<number[]>;

  removeSongFromPlaylist: (
  playlistId: number,
  songId: number
) => Promise<void>;

};

const PlaylistContext =
  createContext<PlaylistContextType | null>(null);

export function PlaylistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [playlists, setPlaylists] =
    useState<Playlist[]>([]);

  async function loadPlaylists() {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadPlaylists();
  }, []);

  async function createPlaylist(
    name: string
  ) {
    await apiCreatePlaylist(name);
    await loadPlaylists();
  }

  async function deletePlaylist(
    id: number
  ) {
    await apiDeletePlaylist(id);
    await loadPlaylists();
  }

  async function addSongToPlaylist(
    playlistId: number,
    songId: number
  ) {
    await apiAddSongToPlaylist(
      playlistId,
      songId
    );
  }

  async function getPlaylistSongs(
    playlistId: number
  ) {
    const songs =
      await apiGetPlaylistSongs(
        playlistId
      );

    return songs.map(
      (song: any) => song.id
    );
  }

async function removeSongFromPlaylist(
  playlistId: number,
  songId: number
) {
  await apiRemoveSongFromPlaylist(
    playlistId,
    songId
  );
}

  return (
    <PlaylistContext.Provider
     value={{
  playlists,
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getPlaylistSongs,
}}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylists() {
  const context =
    useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "usePlaylists must be used inside PlaylistProvider"
    );
  }

  return context;
}