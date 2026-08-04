import { useEffect, useState } from "react";

import SongRow from "../components/SongRow";
import { getSongs } from "../services/songService";
import { useSearchHistory } from "../context/SearchContext";

import type { Song } from "../types/song";

export default function Search() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [query, setQuery] = useState("");

  const {
    history,
    addSearch,
    clearHistory,
  } = useSearchHistory();

  useEffect(() => {
    async function loadSongs() {
      const data = await getSongs();
      setSongs(data);
    }

    loadSongs();
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      song.title
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      song.artist
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      song.album
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  function handleSearch(value: string) {
    setQuery(value);

    if (value.trim()) {
      addSearch(value);
    }
  }

  return (
    <div className="space-y-8 text-white">

      {/* Header */}

      <div>

        <h1 className="text-3xl sm:text-4xl font-black">
          Search
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Find your favourite songs, artists and albums.
        </p>

      </div>

      {/* Search Input */}

      <div>

        <input
          value={query}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
          placeholder="Search songs, artists or albums..."
          className="
            w-full
            rounded-2xl
            bg-neutral-800
            border
            border-neutral-700
            px-5
            py-4
            text-sm
            sm:text-base
            outline-none
            transition
            focus:border-green-500
            focus:ring-2
            focus:ring-green-500/30
          "
        />

      </div>

      {/* Search History */}

      {query === "" && history.length > 0 && (

        <section
          className="
            rounded-2xl
            border
            border-neutral-800
            bg-neutral-900/50
            p-5
          "
        >

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-lg sm:text-xl font-bold">
              Recent Searches
            </h2>

            <button
              onClick={clearHistory}
              className="
                text-sm
                text-red-400
                hover:text-red-300
                transition
              "
            >
              Clear
            </button>

          </div>

          <div className="flex flex-wrap gap-3">

            {history.map((item) => (

              <button
                key={item}
                onClick={() => setQuery(item)}
                className="
                  rounded-full
                  bg-neutral-800
                  px-4
                  py-2
                  text-sm
                  hover:bg-green-600
                  hover:text-white
                  transition
                "
              >
                {item}
              </button>

            ))}

          </div>

        </section>

      )}

      {/* Songs */}

      <section>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">

          {query
            ? `Results (${filteredSongs.length})`
            : "Browse Songs"}

        </h2>

        {filteredSongs.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900/50
              p-10
              text-center
              text-gray-400
            "
          >
            No songs found.
          </div>

        ) : (

          <div className="space-y-2 overflow-hidden">

            {filteredSongs.map((song) => (

              <SongRow
                key={song.id}
                song={song}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}