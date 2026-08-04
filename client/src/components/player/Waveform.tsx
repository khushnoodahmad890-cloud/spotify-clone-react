export default function Waveform() {
  const bars = Array.from({ length: 120 });

  return (
    <div
      className="
        flex
        items-end
        gap-[2px]
        h-36
        w-full
        overflow-hidden
        rounded-xl
        bg-neutral-900
        px-3
        py-4
      "
    >
      {bars.map((_, index) => {
        const height = 20 + ((index * 17) % 80);

        return (
          <div
            key={index}
            className="
              flex-1
              bg-gradient-to-t
              from-green-500
              to-green-300
              rounded-full
              animate-pulse
            "
            style={{
              height: `${height}%`,
              animationDelay: `${index * 20}ms`,
              animationDuration: "1.2s",
            }}
          />
        );
      })}
    </div>
  );
}