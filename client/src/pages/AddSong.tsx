import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSong } from "../services/songService";
import { useToast } from "../context/ToastContext";

export default function AddSong() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    cover: "",
    audio: "",
    lyrics: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "duration" ? Number(value) : value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await addSong(form);

      showToast(`"${form.title}" was added to the library`, "success");

      navigate("/admin");
    } catch (error) {
      console.error(error);
      showToast("Failed to add song", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto text-white space-y-8">
      {/* Header */}
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-green-600
          via-green-700
          to-black
          p-8
          md:p-10
          shadow-xl
        "
      >
        <p className="uppercase tracking-[4px] text-green-100 font-bold">
          Admin
        </p>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mt-2
          "
        >
          Upload New Song
        </h1>

        <p className="text-green-100 mt-4 max-w-2xl">
          Add a new song to your SPOTIFY music
          library. Fill in the song information below
          and publish it instantly.
        </p>
      </div>

      {/* Upload Form */}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Song Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter song title"
                required
                className="
                  w-full
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  p-4
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
                type="text"
                name="artist"
                value={form.artist}
                onChange={handleChange}
                placeholder="Artist name"
                required
                className="
                  w-full
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  p-4
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
                type="text"
                name="album"
                value={form.album}
                onChange={handleChange}
                placeholder="Album name"
                required
                className="
                  w-full
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  p-4
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
                placeholder="240"
                required
                className="
                  w-full
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  p-4
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
              type="text"
              name="cover"
              value={form.cover}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="
                w-full
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                p-4
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
              type="text"
              name="audio"
              value={form.audio}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="
                w-full
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                p-4
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
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                p-4
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
                  w-44
                  h-44
                  rounded-2xl
                  object-cover
                  border
                  border-neutral-700
                  shadow-xl
                "
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <div
            className="
              flex
              flex-col-reverse
              md:flex-row
              gap-4
              pt-4
            "
          >
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="
                md:w-44
                py-4
                rounded-xl
                border
                border-neutral-700
                bg-neutral-800
                hover:bg-neutral-700
                transition
                font-semibold
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                py-4
                rounded-xl
                bg-green-500
                text-black
                font-bold
                text-lg
                hover:scale-[1.02]
                hover:bg-green-400
                transition
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >
              {loading ? "Uploading Song..." : "Publish Song"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
