"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

export function ScrollToTop({ threshold = 400 }: { threshold?: number } = {}) {
  const [visible, setVisible] = React.useState(false);
  const [scrollingUp, setScrollingUp] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY >= threshold);
      setScrollingUp(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-2 border border-dashed border-taupe-400 bg-background/80 backdrop-blur-sm text-foreground hover:opacity-100 transition-all duration-300 cursor-pointer",
        visible
          ? cn("scale-100 blur-none pointer-events-auto", scrollingUp ? "opacity-100" : "opacity-40")
          : "opacity-0 scale-[0.1] blur-sm pointer-events-none",
      )}
    >
      <ArrowUp className="size-4 sm:size-5" />
    </button>
  );
}
