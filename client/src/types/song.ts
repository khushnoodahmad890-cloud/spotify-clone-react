export interface Song {
  id: number;

  title: string;

  artist: string;

  album: string;

  duration: number;

  cover: string;

  audio: string;

  lyrics?: string;

  created_at?: string;
}