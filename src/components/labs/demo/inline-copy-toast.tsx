"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

const CODE = "492837";

function InlineCopyToast() {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(CODE).then((success) => {
      if (success) setIsCopied(true);
    });
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-full">
      <span
        role="status"
        className="sr-only"
      >
        {isCopied ? "Code copied to clipboard" : ""}
      </span>
      <div className="w-[190px] h-14 bg-mauve-100 rounded-full ring ring-inset ring-mauve-200/50">
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {isCopied ? (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 1.25, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.25, filter: "blur(12px)" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full flex items-center justify-center gap-2 py-2"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ type: "tween", ease: "linear", duration: 1.5 }}
                onAnimationComplete={() => setIsCopied(false)}
                className="absolute -z-10 inset-0 bg-mauve-300 rounded-full"
              />

              <CheckCircle className="size-6 text-mauve-600" />
              <span className="font-semibold text-mauve-600">Code Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-view"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              transition={{ type: "tween", duration: 0.15 }}
              className="w-full flex items-center justify-between pl-5 pr-2 py-2"
            >
              <span className="font-semibold text-mauve-400 select-none tracking-widest tabular-nums">{CODE}</span>
              <motion.button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "h-10 inline-flex items-center px-5 rounded-full bg-white font-medium shadow-lg cursor-pointer",
                  "hover:bg-mauve-50 enabled:focus:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
                  "transition-[background-color,scale] ease-out-cubic will-change-transform",
                )}
              >
                <span className="mb-0.5 text-mauve-600">Copy</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CheckCircle({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <title>Circle Check icon</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { InlineCopyToast };
