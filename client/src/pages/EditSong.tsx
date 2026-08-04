import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSong,
  updateSong,
} from "../services/songService";
import { useToast } from "../context/ToastContext";

import type { Song } from "../types/song";

export default function EditSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<
    Omit<Song, "id" | "created_at">
  >({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    cover: "",
    audio: "",
    lyrics: "",
  });

  useEffect(() => {
    async function loadSong() {
      try {
        if (!id) return;

        const song = await getSong(Number(id));

        setForm({
          title: song.title,
          artist: song.artist,
          album: song.album,
          duration: song.duration,
          cover: song.cover,
          audio: song.audio,
          lyrics: song.lyrics || "",
        });
      } catch (err) {
        console.error(err);
        showToast("Failed to load song", "error");
      } finally {
        setLoading(false);
      }
    }

    loadSong();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "duration"
          ? Number(e.target.value)
          : e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      if (!id) return;

      await updateSong(Number(id), form);

      showToast(`"${form.title}" was updated`, "success");

      navigate("/admin");
    } catch (err) {
      console.error(err);
      showToast("Failed to update song", "error");
    }
  }

  if (loading) {
    return (
      <div className="text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-white space-y-8">

      {/* Hero */}

      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          via-cyan-600
          to-black
          p-8
          md:p-10
          shadow-xl
        "
      >
        <p className="uppercase tracking-[4px] text-cyan-100 font-bold">
          Admin
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-2">
          Edit Song
        </h1>

        <p className="text-cyan-100 mt-4 max-w-2xl">
          Update song information and save your
          changes instantly.
        </p>
      </div>

      {/* Form */}

      <div
        className="
          bg-neutral-900
          border
          border-neutral-800
          rounded-3xl
          p-6
          md:p-8
          shadow-xl
        "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Song Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Artist
              </label>

              <input
                name="artist"
                value={form.artist}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Album
              </label>

              <input
                name="album"
                value={form.album}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Duration (seconds)
              </label>

              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                "
              />
            </div>

          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Cover Image URL
            </label>

            <input
              name="cover"
              value={form.cover}
              onChange={handleChange}
              required
              className="
                w-full
                p-4
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                outline-none
                focus:border-green-500
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Audio URL
            </label>

            <input
              name="audio"
              value={form.audio}
              onChange={handleChange}
              required
              className="
                w-full
                p-4
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                outline-none
                focus:border-green-500
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Lyrics <span className="text-gray-600">(optional)</span>
            </label>

            <textarea
              name="lyrics"
              value={form.lyrics}
              onChange={handleChange}
              placeholder="Paste the song lyrics here — they'll show up on the Now Playing screen"
              rows={6}
              className="
                w-full
                p-4
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                outline-none
                focus:border-green-500
                resize-y
              "
            />
          </div>

          {form.cover && (
            <div>
              <p className="text-sm text-gray-400 mb-3">
                Cover Preview
              </p>

              <img
                src={form.cover}
                alt="Preview"
                className="
                  w-48
                  h-48
                  rounded-2xl
                  object-cover
                  border
                  border-neutral-700
                "
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 pt-2">

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="
                md:w-44
                py-4
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                hover:bg-neutral-700
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1
                py-4
                rounded-xl
                bg-green-500
                text-black
                font-bold
                hover:bg-green-400
                transition
              "
            >
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}