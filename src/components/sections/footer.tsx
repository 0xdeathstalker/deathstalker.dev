"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import * as React from "react";

export default function Footer() {
  const textRef = React.useRef<HTMLHeadingElement>(null);
  const footerRef = React.useRef<HTMLElement>(null);
  const [fontWeight, setFontWeight] = React.useState(100);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        break;
    }
  };

  function toggleTheme() {
    //@ts-ignore
    if (!document.startViewTransition) switchTheme();

    //@ts-ignore
    document.startViewTransition(switchTheme);
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !footerRef.current) return;

      const text = textRef.current;
      const textRect = text.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // calculating how much of the text is visible
      const textTop = textRect.top;
      const textHeight = textRect.height;
      const textVisibleHeight = Math.max(0, Math.min(textHeight, windowHeight - textTop));
      const textVisibilityRatio = textVisibleHeight / textHeight;

      // mapping visibility ratio to font weight
      let newFontWeight = 100;
      if (textVisibilityRatio > 0) {
        if (textVisibilityRatio <= 0.2) {
          newFontWeight = 100 + (textVisibilityRatio / 0.2) * 300; // 100-400
        } else if (textVisibilityRatio <= 0.4) {
          newFontWeight = 400 + ((textVisibilityRatio - 0.2) / 0.2) * 100; // 400-500
        } else if (textVisibilityRatio <= 0.6) {
          newFontWeight = 500 + ((textVisibilityRatio - 0.4) / 0.2) * 200; // 500-700
        } else if (textVisibilityRatio <= 0.8) {
          newFontWeight = 700 + ((textVisibilityRatio - 0.6) / 0.2) * 150; // 700-850
        } else {
          newFontWeight = 850 + ((textVisibilityRatio - 0.8) / 0.2) * 50; // 850-900
        }
      }

      setFontWeight(parseFloat(newFontWeight.toFixed(2)));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative h-24 md:h-48 lg:h-56 xl:h-72 w-full overflow-hidden"
    >
      <motion.h1
        ref={textRef}
        style={{ fontWeight }}
        transition={{ duration: 0.1 }}
        className="text-shadow-md font-sans dark:text-neutral-600 cursor-default select-none absolute bottom-0 left-0 right-0 text-6xl md:text-[140px] lg:text-[180px] xl:text-[210px] translate-y-[15%] tracking-tighter uppercase text-center mx-auto text-neutral-400"
      >
        dthstlkr
      </motion.h1>
    </footer>
  );
}
