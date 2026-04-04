"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

function ColorTransitionTabs() {
  const [speed, setSpeed] = React.useState(0.25);

  const [activeTab, setActiveTab] = React.useState(TABS[0]);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const activeTabRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const activeEl = activeTabRef.current;

    if (container && activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative flex justify-center border rounded-lg py-12">
      <button
        onClick={() => {
          setSpeed((prev) => {
            if (prev === 0.25) {
              return 1.25;
            }
            return 0.25;
          });
        }}
        className="absolute top-2 right-2 bg-mauve-200 rounded-lg px-2 py-0.5 overflow-hidden active:scale-[0.97]"
      >
        <span className="text-xs inline-block">{speed === 0.25 ? "1x" : "0.2x"}</span>
      </button>

      <div className="relative">
        <ul
          ref={containerRef}
          className="flex items-center gap-5"
        >
          {TABS.map((tab, idx) => (
            <li key={`${tab}-${idx + 1}`}>
              <button
                ref={tab === activeTab ? activeTabRef : null}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "h-10 px-4 py-2 rounded-[16px] relative z-10 transition-colors ease",
                  activeTab === tab ? "text-white" : "text-foreground",
                )}
                style={{ transitionDuration: `${speed}s` }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="absolute top-0 h-10 rounded-[16px] bg-[#F76F53] transition-[left,width] ease"
          style={{
            transitionDuration: `${speed}s`,
            ...indicatorStyle,
          }}
        />
      </div>
    </div>
  );
}

export { ColorTransitionTabs };

const TABS = ["all", "products", "resources", "developers", "about"];
