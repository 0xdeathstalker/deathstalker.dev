"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

function TextFlip({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = React.useState(0);

  const items = React.Children.toArray(children);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % items.length;
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.p
        key={index}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.25 }}
        className="inline-block"
      >
        {items[index]}
      </motion.p>
    </AnimatePresence>
  );
}

export { TextFlip };
