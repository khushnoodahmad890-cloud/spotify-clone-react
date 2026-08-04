import { Link } from "react-router-dom";
import {
  Heart,
  Library,
  ListMusic,
  Crown,
  Disc3,
  Mic2,
} from "lucide-react";
import { useHistory } from "../context/HistoryContext";
import SongRow from "../components/SongRow";

export default function Home() {
  const { history } = useHistory();

  const quickLinks = [
    {
      title: "Liked Songs",
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/library",
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Your Library",
      icon: <Library className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/library",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Queue",
      icon: <ListMusic className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/queue",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Albums",
      icon: <Disc3 className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/search",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Artists",
      icon: <Mic2 className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/search",
      color: "from-indigo-500 to-purple-700",
    },
    {
      title: "Premium",
      icon: <Crown className="w-6 h-6 sm:w-7 sm:h-7" />,
      to: "/premium",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 text-white">

      {/* Hero */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-green-700
          via-green-600
          to-emerald-500
          p-6
          sm:p-8
          lg:p-10
          shadow-xl
        "
      >
        <p className="text-green-100 text-sm sm:text-base lg:text-lg">
          Welcome back 👋
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black">
          Good Evening
        </h1>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-green-100 leading-relaxed">
          Continue listening to your favourite music,
          playlists and artists.
        </p>
      </section>

      {/* Quick Access */}

      <section>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Quick Access
        </h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            sm:gap-5
          "
        >
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`
                bg-gradient-to-r
                ${item.color}
                rounded-2xl
                p-4
                sm:p-5
                lg:p-6
                flex
                items-center
                gap-3
                sm:gap-4
                hover:scale-[1.03]
                transition-all
                duration-300
                shadow-lg
              `}
            >
              {item.icon}

              <span className="font-bold text-base sm:text-lg">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

      </section>

      {/* Recently Played */}

      <section>

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Recently Played
        </h2>

        {history.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900/50
              p-8
              text-center
              text-gray-400
            "
          >
            No recently played songs.
          </div>

        ) : (

          <div className="space-y-2 overflow-hidden">

            {history.map((song) => (

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