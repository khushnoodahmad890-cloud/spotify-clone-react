import { Play } from "lucide-react";

type SongCardProps = {
  title: string;
  artist: string;
  image: string;
};

export default function SongCard({
  title,
  artist,
  image,
}: SongCardProps) {
  return (
    <div
      className="
        group
        bg-neutral-900
        hover:bg-neutral-800
        rounded-2xl
        p-4
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-black/40
      "
    >
      <div className="relative overflow-hidden rounded-xl">

        <img
          src={image}
          alt={title}
          className="
            w-full
            h-48
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-transparent
            to-transparent
          "
        />

        <button
          className="
            absolute
            bottom-4
            right-4
            w-14
            h-14
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            shadow-lg
            opacity-0
            translate-y-4
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <Play
            size={22}
            fill="black"
            color="black"
          />
        </button>

      </div>

      <div className="mt-4">

        <h3
          className="
            font-bold
            text-lg
            truncate
            group-hover:text-green-400
            transition
          "
        >
          {title}
        </h3>

        <p
          className="
            text-sm
            text-gray-400
            truncate
            mt-1
          "
        >
          {artist}
        </p>

      </div>

    </div>
  );
}