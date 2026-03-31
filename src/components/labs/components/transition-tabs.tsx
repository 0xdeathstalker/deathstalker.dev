"use client";

import * as React from "react";

function TransitionTabs() {
  const [activeTab, setActiveTab] = React.useState(TABS[0]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const activeTabElementRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (container && activeTab) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;

        container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 16px)`;
      }
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <ul className="flex items-center gap-5">
        {TABS.map((tab, idx) => (
          <li key={`${tab}-${idx + 1}`}>
            <button
              ref={tab === activeTab ? activeTabElementRef : null}
              onClick={() => setActiveTab(tab)}
              className="h-10 px-4 py-2"
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 [clip-path:inset(0_91%_0_0_round_16px)] transition-[clip-path] duration-[0.25s] ease"
      >
        <ul className="flex items-center gap-5 bg-purple-600">
          {TABS.map((tab, idx) => (
            <li key={`${tab}-${idx + 1}`}>
              <button
                tabIndex={-1}
                className="h-10 px-4 py-2 text-white"
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { TransitionTabs };

const TABS = ["all", "products", "resources", "developers", "about"];
