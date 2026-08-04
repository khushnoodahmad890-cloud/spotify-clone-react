import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Plus,
} from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-20
        bg-neutral-950/80
        backdrop-blur-xl
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-6
      "
    >
      {/* Logo */}

      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <div
          className="
            w-11
            h-11
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-black
            font-black
            text-xl
          "
        >
          ♪
        </div>

        <h1 className="text-3xl font-black text-white">
          SPOTIFY
        </h1>
      </Link>

      {/* Search */}

      <div className="hidden md:flex relative w-[420px]">

        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search songs, artists..."
          className="
            w-full
            pl-12
            pr-4
            py-3
            rounded-full
            bg-neutral-900
            border
            border-neutral-700
            focus:border-green-500
            outline-none
            transition
          "
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <Link
          to="/add-song"
          className="
            hidden
            md:flex
            items-center
            gap-2
            bg-green-500
            text-black
            px-5
            py-2.5
            rounded-full
            font-bold
            hover:scale-105
            transition
          "
        >
          <Plus size={18} />
          Add Song
        </Link>

        <button
          className="
            w-11
            h-11
            rounded-full
            bg-neutral-900
            flex
            items-center
            justify-center
            hover:bg-neutral-800
            transition
          "
        >
          <Bell size={20} />
        </button>

        <button
          className="
            w-11
            h-11
            rounded-full
            bg-green-500
            text-black
            flex
            items-center
            justify-center
            font-bold
          "
        >
          <User size={20} />
        </button>

      </div>
    </header>
  );
}