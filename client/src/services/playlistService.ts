import axios from "axios";
const API =`${import.meta.env.VITE_API_URL}/api/playlists`


const playlistApi = axios.create({
  baseURL: API,
});

playlistApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getPlaylists = async () => {
  const response = await playlistApi.get("/");
  return response.data;
};

export const createPlaylist = async (name: string) => {
  const response = await playlistApi.post("/", { name });
  return response.data;
};

export const deletePlaylist = async (id: number) => {
  const response = await playlistApi.delete(`/${id}`);
  return response.data;
};

export const addSongToPlaylist = async (
  playlistId: number,
  songId: number
) => {
  const response = await playlistApi.post(
    `/${playlistId}/songs`,
    { songId }
  );

  return response.data;
};

export const removeSongFromPlaylist = async (
  playlistId: number,
  songId: number
) => {
  const response = await playlistApi.delete(
    `/${playlistId}/songs`,
    {
      data: { songId },
    }
  );

  return response.data;
};

export const getPlaylistSongs = async (
  playlistId: number
) => {
  const response = await playlistApi.get(
    `/${playlistId}`
  );

  return response.data;
};