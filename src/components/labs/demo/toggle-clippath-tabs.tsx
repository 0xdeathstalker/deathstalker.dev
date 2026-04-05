"use client";

import * as React from "react";
import { TransitionTabs } from "@/components/labs/components/transition-tabs";
import { ToggleSpeed } from "@/components/labs/speed-toggle";

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

        <ToggleSpeed
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>

      <TransitionTabs
        toggleClipPath={toggleClipPath}
        speed={speed}
      />
    </div>
  );
}

export { ToggleClippathDemo };
