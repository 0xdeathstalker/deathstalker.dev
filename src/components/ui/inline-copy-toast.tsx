"use client";

import type { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

const FADE_ONLY = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const IDLE_MOTION = {
  initial: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
};

const SUCCESS_MOTION = {
  initial: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
};

const SUCCESS_TRANSITION = { type: "spring", bounce: 0.1, duration: 0.5 } as const;

const IDLE_TRANSITION = { type: "tween", duration: 0.15 } as const;

type InlineCopyToastContextValue = {
  isCopied: boolean;
  copy: () => void;
  reset: () => void;
  duration: number;
};

const InlineCopyToastContext = React.createContext<InlineCopyToastContextValue | null>(null);

function useInlineCopyToast(part: string) {
  const context = React.useContext(InlineCopyToastContext);
  if (!context) {
    throw new Error(`${part} must be used within <InlineCopyToast>`);
  }
  return context;
}

type InlineCopyToastProps = {
  value: string;
  duration?: number;
} & React.ComponentProps<"div">;

function InlineCopyToast({ value, duration = 1.2, className, children, ...props }: InlineCopyToastProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const copy = React.useCallback(() => {
    copyToClipboard(value).then((success) => {
      if (success) setIsCopied(true);
    });
  }, [copyToClipboard, value]);

  const contextValue = React.useMemo<InlineCopyToastContextValue>(
    () => ({
      isCopied,
      copy,
      reset: () => setIsCopied(false),
      duration,
    }),
    [isCopied, copy, duration],
  );

  return (
    <InlineCopyToastContext.Provider value={contextValue}>
      <div
        data-slot="inline-copy-toast"
        className={cn(
          "relative w-fit h-10 overflow-hidden rounded-xl bg-accent ring-[0.5px] ring-inset ring-border",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </InlineCopyToastContext.Provider>
  );
}

function InlineCopyToastContent({ className, ...props }: HTMLMotionProps<"div">) {
  const { isCopied } = useInlineCopyToast("InlineCopyToastContent");
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {!isCopied && (
        <motion.div
          data-slot="inline-copy-toast-content"
          {...(shouldReduceMotion ? FADE_ONLY : IDLE_MOTION)}
          transition={IDLE_TRANSITION}
          className={cn("absolute inset-0 flex items-center justify-between px-2 text-primary", className)}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

function InlineCopyToastSuccess({ className, children, transition, ...props }: HTMLMotionProps<"div">) {
  const { isCopied, reset, duration } = useInlineCopyToast("InlineCopyToastSuccess");
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {isCopied && (
        <motion.div
          data-slot="inline-copy-toast-success"
          {...(shouldReduceMotion ? FADE_ONLY : SUCCESS_MOTION)}
          transition={transition ?? SUCCESS_TRANSITION}
          className={cn("absolute inset-0 flex items-center justify-center gap-2 py-2", className)}
          {...props}
        >
          <>
            {/* WIPE MOTION DIV */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ type: "tween", ease: "linear", duration }}
              onAnimationComplete={reset}
              className="absolute -z-10 inset-0 bg-border"
            />

            {children}
          </>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InlineCopyToastTrigger({ className, onClick, children, ...props }: React.ComponentProps<"button">) {
  const { copy } = useInlineCopyToast("InlineCopyToastTrigger");

  return (
    <button
      type="button"
      data-slot="inline-copy-toast-trigger"
      onClick={(event) => {
        onClick?.(event);
        copy();
      }}
      className={cn(
        "size-7 inline-flex items-center justify-center rounded-lg bg-white font-medium shadow-lg cursor-pointer",
        "hover:bg-background active:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
        "transition-[background-color,scale] ease-out-cubic",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { InlineCopyToast, InlineCopyToastContent, InlineCopyToastSuccess, InlineCopyToastTrigger };
