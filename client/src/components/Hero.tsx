import { Play, Music2, Disc3, Users } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-green-500
        via-emerald-600
        to-black
        p-8
        md:p-14
        mb-10
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          w-72
          h-72
          bg-green-400/20
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10 max-w-3xl">

        <div className="flex items-center gap-3 mb-6">

          <Music2
            size={36}
            className="text-white"
          />

          <span
            className="
              uppercase
              tracking-[0.35em]
              text-sm
              font-bold
              text-green-100
            "
          >
            Spotify
          </span>

        </div>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
            leading-tight
          "
        >
          Feel Every
          <br />

          Beat.
        </h1>

        <p
          className="
            mt-6
            text-green-100
            text-lg
            max-w-2xl
            leading-relaxed
          "
        >
          Stream millions of songs, discover new
          artists, build playlists and enjoy music
          anytime, anywhere.
        </p>

        <button
          className="
            mt-8
            flex
            items-center
            gap-3
            bg-black
            hover:bg-neutral-900
            px-7
            py-4
            rounded-full
            font-bold
            transition
            hover:scale-105
          "
        >
          <Play
            size={18}
            fill="white"
          />

          Start Listening
        </button>

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-3
            gap-6
            mt-12
            max-w-2xl
          "
        >
          <div className="flex items-center gap-3">

            <Disc3 className="text-green-200" />

            <div>

              <h3 className="text-xl font-bold">
                5K+
              </h3>

              <p className="text-sm text-green-100">
                Songs
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Users className="text-green-200" />

            <div>

              <h3 className="text-xl font-bold">
                1K+
              </h3>

              <p className="text-sm text-green-100">
                Artists
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Music2 className="text-green-200" />

            <div>

              <h3 className="text-xl font-bold">
                Unlimited
              </h3>

              <p className="text-sm text-green-100">
                Playlists
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}