"use client";

import * as React from "react";

const SCROLL_THRESHOLD = 80;

export function ScrollGradients() {
  const [topOpacity, setTopOpacity] = React.useState(0);
  const [bottomOpacity, setBottomOpacity] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const remaining = scrollHeight - scrollTop - clientHeight;

      // Top gradient: hidden at top, visible as you scroll down
      const newTopOpacity = Math.min(scrollTop / SCROLL_THRESHOLD, 1);

      // Bottom gradient: visible until near bottom, then fades out
      const newBottomOpacity = Math.min(remaining / SCROLL_THRESHOLD, 1);

      setTopOpacity(newTopOpacity);
      setBottomOpacity(newBottomOpacity);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="bg-gradient-to-b from-background to-transparent fixed top-0 left-0 h-10 w-full z-50 pointer-events-none transition-opacity duration-300"
        style={{ opacity: topOpacity }}
      />
      <div
        className="bg-gradient-to-t from-background to-transparent fixed bottom-0 left-0 h-10 w-full z-50 pointer-events-none transition-opacity duration-300"
        style={{ opacity: bottomOpacity }}
      />
    </>
  );
}
