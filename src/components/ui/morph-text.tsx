"use client";

import { cn } from "@/lib/utils";
import type { MotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type * as React from "react";

function MorphText({ children, className, ...props }: React.ComponentProps<"span"> & MotionProps) {
  const text = generateKeys(children as string);

  return (
    <span>
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        {text.map(({ char, key }) => (
          <motion.span
            key={key}
            layoutId={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.25,
              bounce: 0,
              opacity: {
                type: "spring",
                duration: 0.25,
                bounce: 0,
              },
            }}
            className={cn("inline-block text-inherit", className)}
            {...props}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export { MorphText };

function generateKeys(text: string) {
  const charCount: Record<string, number> = {};

  return text.split("").map((char) => {
    if (!charCount[char]) {
      charCount[char] = 0;
    }
    charCount[char]++;
    const key = `${char}-${charCount[char]}`;

    return { char, key };
  });
}
