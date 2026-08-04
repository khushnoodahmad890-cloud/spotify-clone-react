import axios from "axios";
import type { Song } from "../types/song";

const API = `${import.meta.env.VITE_API_URL}/api/songs`;

const songApi = axios.create({
  baseURL: API,
});

export const getSongs = async (): Promise<Song[]> => {
  try {
    const response = await songApi.get("/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    throw error;
  }
};

export const getSong = async (
  id: number
): Promise<Song> => {
  try {
    const response = await songApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch song:", error);
    throw error;
  }
};

export const addSong = async (
  song: Omit<Song, "id" | "created_at">
): Promise<Song> => {
  try {
    const response = await songApi.post("/", song);
    return response.data;
  } catch (error) {
    console.error("Failed to add song:", error);
    throw error;
  }
};

export const updateSong = async (
  id: number,
  song: Omit<Song, "id" | "created_at">
): Promise<Song> => {
  try {
    const response = await songApi.put(`/${id}`, song);
    return response.data;
  } catch (error) {
    console.error("Failed to update song:", error);
    throw error;
  }
};

export const deleteSong = async (
  id: number
) => {
  try {
    const response = await songApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete song:", error);
    throw error;
  }
};