"use client";

import type { MotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const defaultTransition = {
  type: "spring",
  duration: 0.25,
  bounce: 0,
  opacity: {
    type: "spring",
    duration: 0.25,
    bounce: 0,
  },
} as const;

function MorphText({
  children,
  className,
  initial,
  animate,
  exit,
  transition,
  ...props
}: React.ComponentProps<"span"> & MotionProps) {
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
            initial={initial ?? { opacity: 0 }}
            animate={animate ?? { opacity: 1 }}
            exit={exit ?? { opacity: 0 }}
            transition={transition ?? defaultTransition}
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
    charCount[char] = (charCount[char] ?? 0) + 1;
    return { char, key: `${char}-${charCount[char]}` };
  });
}
