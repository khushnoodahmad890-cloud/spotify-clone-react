import {
  NavLink,
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  ListMusic,
  Upload,
  Shield,
  Music2,
} from "lucide-react";

import { usePlaylists } from "../../context/PlaylistContext";

export default function Sidebar() {
  const navigate = useNavigate();

  const { playlists } = usePlaylists();

  return (
    <aside
      className="
        hidden
        md:flex
        w-72
        bg-black
        flex-col
        p-6
        border-r
        border-neutral-800
      "
    >
      {/* Logo */}
      <Link
        to="/"
        className="
          text-3xl
          font-bold
          text-green-500
          mb-10
          hover:text-green-400
          transition
          block
        "
      >
        SPOTIFY
      </Link>

      {/* Main Navigation */}
      <nav className="space-y-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Home size={24} />
          Home
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Search size={24} />
          Search
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Library size={24} />
          Library
        </NavLink>

        <NavLink
          to="/queue"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <ListMusic size={24} />
          Queue
        </NavLink>

        <NavLink
          to="/now-playing"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Music2 size={24} />
          Now Playing
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Shield size={24} />
          Admin
        </NavLink>

        <NavLink
          to="/add-song"
          className={({ isActive }) =>
            `flex items-center gap-4 font-semibold transition ${
              isActive
                ? "text-green-500"
                : "hover:text-green-400"
            }`
          }
        >
          <Upload size={24} />
          Add Song
        </NavLink>
      </nav>

      {/* Library */}
      <div className="mt-10 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Library size={22} />
            <span className="font-semibold">
              Your Library
            </span>
          </div>

          <Plus
            size={20}
            onClick={() => navigate("/playlists")}
            className="cursor-pointer hover:text-green-400"
          />
        </div>

        <div
          onClick={() => navigate("/library")}
          className="
            flex
            items-center
            gap-3
            mb-5
            cursor-pointer
            hover:text-green-400
          "
        >
          <Heart
            size={20}
            className="fill-green-500 text-green-500"
          />

          <span>Liked Songs</span>
        </div>

        <hr className="border-neutral-800 mb-5" />

        <div className="overflow-y-auto space-y-3 text-gray-400">
          {playlists.length === 0 ? (
            <p className="text-sm">
              No playlists
            </p>
          ) : (
            playlists.map((playlist) => (
              <p
                key={playlist.id}
                onClick={() =>
                  navigate(`/playlist/${playlist.id}`)
                }
                className="
                  cursor-pointer
                  hover:text-white
                  transition
                "
              >
                {playlist.name}
              </p>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}