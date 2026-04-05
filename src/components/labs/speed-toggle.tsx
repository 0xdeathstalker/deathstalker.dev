import { cn } from "@/lib/utils";
import * as React from "react";

type ToggleSpeedProps = {
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
} & React.ComponentProps<"button">;

function ToggleSpeed({ speed, setSpeed, className, ...props }: ToggleSpeedProps) {
  React.useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "s") {
        setSpeed((prev) => {
          if (prev === 0.25) {
            return 1.25;
          }
          return 0.25;
        });
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setSpeed]);

  return (
    <button
      onClick={() => {
        setSpeed((prev) => {
          if (prev === 0.25) {
            return 1.25;
          }
          return 0.25;
        });
      }}
      className={cn("bg-mauve-200 rounded-lg px-2 py-0.5 overflow-hidden active:scale-[0.97]", className)}
      {...props}
    >
      <span className="text-xs inline-block">{speed === 0.25 ? "1x" : "0.2x"}</span>
    </button>
  );
}

export { ToggleSpeed };
