export default function Footer() {
  return (
    <footer className="relative h-[clamp(8rem,17vw,18rem)] w-full bg-background overflow-hidden">
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0 w-full max-w-[650px] max-[690px]:w-[calc(100%-2rem)]"
        style={{
          background: "#fbfaf9",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(89, 76, 91, 0.15) 1px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
      />
      <h1 className="font-pixel-square font-black dark:text-neutral-600 cursor-default select-none absolute inset-x-0 bottom-0 text-center uppercase tracking-tighter text-[oklch(72.8%_0.007_39.5)] text-shadow-md leading-[0.7] text-[clamp(4rem,18vw,7.5rem)]">
        dthstlkr
      </h1>
    </footer>
  );
}
