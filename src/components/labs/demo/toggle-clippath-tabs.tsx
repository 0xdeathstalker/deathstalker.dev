"use client";

import * as React from "react";
import { TransitionTabs } from "@/components/labs/components/transition-tabs";

function ToggleClippathDemo() {
  const [toggleClipPath, setToggleClipPath] = React.useState(false);
  const [speed, setSpeed] = React.useState(0.25);

  return (
    <div className="relative flex justify-center border rounded-lg py-12">
      <div className="absolute top-2 right-2 space-x-2">
        <button
          onClick={() => setToggleClipPath((prev) => !prev)}
          className="bg-mauve-200 rounded-lg px-2 py-1 overflow-hidden text-xs active:scale-[0.97]"
        >
          toggle clip path
        </button>

        <button
          onClick={() => {
            setSpeed((prev) => {
              if (prev === 0.25) {
                return 1.25;
              }
              return 0.25;
            });
          }}
          className="bg-mauve-200 rounded-lg px-2 py-0.5 overflow-hidden active:scale-[0.97]"
        >
          <span className="text-xs inline-block">{speed === 0.25 ? "1x" : "0.2x"}</span>
        </button>
      </div>

      <TransitionTabs
        toggleClipPath={toggleClipPath}
        speed={speed}
      />
    </div>
  );
}

export { ToggleClippathDemo };
