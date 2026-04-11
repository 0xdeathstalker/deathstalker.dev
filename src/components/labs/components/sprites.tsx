import { cn } from "@/lib/utils";

function BatterySprite() {
  return (
    <div className="w-[98px] h-6 rounded-sm outline outline-accent-foreground/30 outline-offset-2 overflow-hidden">
      <div
        className={cn(
          "size-full animate-battery",
          "[background:repeating-linear-gradient(to_right,oklch(72.3%_0.219_149.579)_0px_18px,white_18px_20px)]",
        )}
      />
    </div>
  );
}

function FireEyeSprite() {
  return (
    <img
      src="https://cdn.deathstalker.dev/images/eye-fire.png"
      alt="fire eye sprite animation"
      className="size-32 object-cover animate-sprite rounded-xl"
    />
  );
}

function RainSprite() {
  return (
    <img
      src="https://cdn.deathstalker.dev/images/rainman.png"
      alt="rainman sprite animation"
      className="size-32 object-cover animate-sprite rounded-xl [image-rendering:pixelated]"
      style={{
        animationDuration: "0.3s",
        animationTimingFunction: "steps(6)",
      }}
    />
  );
}

export { BatterySprite, FireEyeSprite, RainSprite };
