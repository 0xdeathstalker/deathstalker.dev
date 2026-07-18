"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { cn } from "@/lib/utils";

function InlineCopyToast() {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const shouldReduceMotion = useReducedMotion();

  const fadeOnly = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const successMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
      };

  const idleMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
      };

  const handleCopy = () => {
    copyToClipboard("@xdeathstalker").then((success) => {
      if (success) setIsCopied(true);
    });
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-full">
      <span
        role="status"
        className="sr-only"
      >
        {isCopied ? "Copied to clipboard" : ""}
      </span>
      <div className="w-[220px] h-14 bg-mauve-100 rounded-full ring ring-inset ring-mauve-200/50">
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {isCopied ? (
            <motion.div
              key="success-view"
              {...successMotion}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full flex items-center justify-center gap-2 py-2"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ type: "tween", ease: "linear", duration: 1.2 }}
                onAnimationComplete={() => setIsCopied(false)}
                className="absolute -z-10 inset-0 bg-mauve-300 rounded-full"
              />

              <CheckCircle className="size-6 text-mauve-600" />
              <span className="font-semibold text-mauve-600">Username Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-view"
              {...idleMotion}
              transition={{ type: "tween", duration: 0.15 }}
              className="w-full flex items-center justify-between pl-5 pr-2 py-2"
            >
              <span className="font-semibold text-mauve-400 select-none tracking-wide">@xdeathstalker</span>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "size-10 inline-flex items-center justify-center rounded-full bg-white font-medium shadow-lg cursor-pointer",
                  "hover:bg-mauve-50 focus:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
                  "transition-[background-color,scale] ease-out-cubic will-change-transform",
                )}
              >
                <CopyIcon className="size-4 text-mauve-600" />
              </button>
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

function CopyIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"></path>
      <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"></path>
    </svg>
  );
}

function WalletAddressInlineCopy() {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const shouldReduceMotion = useReducedMotion();

  const fadeOnly = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const successMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
      };

  const idleMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
      };

  const handleCopy = () => {
    copyToClipboard("0x8840BB0D5990161889388Ab0979EF2103cF0dAdF").then((success) => {
      if (success) setIsCopied(true);
    });
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-xl">
      <span
        role="status"
        className="sr-only"
      >
        {isCopied ? "Copied to clipboard" : ""}
      </span>
      <div className="w-[170px] h-10 bg-mauve-100 rounded-xl ring ring-inset ring-mauve-200/50">
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {isCopied ? (
            <motion.div
              key="success-view"
              {...successMotion}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full flex items-center justify-center gap-2 py-2"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ type: "tween", ease: "linear", duration: 1.2 }}
                onAnimationComplete={() => setIsCopied(false)}
                className="absolute -z-10 inset-0 bg-mauve-300 rounded-xl"
              />

              <CheckCircle className="size-5 text-mauve-600" />
              <span className="font-semibold text-mauve-600">Address Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-view"
              {...idleMotion}
              transition={{ type: "tween", duration: 0.15 }}
              className="size-full flex items-center justify-between pl-3 pr-1.5"
            >
              <span className="font-semibold text-mauve-400 select-none tracking-wide">0x884...0dAdF</span>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "size-7 inline-flex items-center justify-center rounded-lg bg-white font-medium shadow-lg cursor-pointer",
                  "hover:bg-mauve-50 focus:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
                  "transition-[background-color,scale] ease-out-cubic will-change-transform",
                )}
              >
                <CopyIcon className="size-4 text-mauve-600" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ApiKeyInlineCopy() {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const shouldReduceMotion = useReducedMotion();

  const fadeOnly = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const successMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
      };

  const idleMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
      };

  const handleCopy = () => {
    copyToClipboard("sk_4f9d21c8").then((success) => {
      if (success) setIsCopied(true);
    });
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-xl">
      <span
        role="status"
        className="sr-only"
      >
        {isCopied ? "Copied to clipboard" : ""}
      </span>
      <div className="w-[160px] h-10 bg-mauve-100 rounded-xl ring ring-inset ring-mauve-200/50">
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {isCopied ? (
            <motion.div
              key="success-view"
              {...successMotion}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full flex items-center justify-center gap-2 py-2"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ type: "tween", ease: "linear", duration: 1.2 }}
                onAnimationComplete={() => setIsCopied(false)}
                className="absolute -z-10 inset-0 bg-mauve-300 rounded-xl"
              />

              <CheckCircle className="size-5 text-mauve-600" />
              <span className="font-semibold text-mauve-600">API Key Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-view"
              {...idleMotion}
              transition={{ type: "tween", duration: 0.15 }}
              className="size-full flex items-center justify-between pl-3 pr-1.5"
            >
              <span className="font-semibold text-mauve-400 select-none tracking-wide">sk_4f9d21c8</span>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "size-7 inline-flex items-center justify-center rounded-lg bg-white font-medium shadow-lg cursor-pointer",
                  "hover:bg-mauve-50 focus:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
                  "transition-[background-color,scale] ease-out-cubic will-change-transform",
                )}
              >
                <CopyIcon className="size-4 text-mauve-600" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CouponCodeInlineCopy() {
  const [isCopied, setIsCopied] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const shouldReduceMotion = useReducedMotion();

  const fadeOnly = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const successMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.25, filter: "blur(12px)" },
      };

  const idleMotion = shouldReduceMotion
    ? fadeOnly
    : {
        initial: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.85, filter: "blur(12px)" },
      };

  const handleCopy = () => {
    copyToClipboard("492837").then((success) => {
      if (success) setIsCopied(true);
    });
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-full">
      <span
        role="status"
        className="sr-only"
      >
        {isCopied ? "Copied to clipboard" : ""}
      </span>
      <div className="w-[160px] h-13 bg-mauve-100 rounded-full ring ring-inset ring-mauve-200/50">
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {isCopied ? (
            <motion.div
              key="success-view"
              {...successMotion}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="size-full flex items-center justify-center gap-2 py-2"
            >
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ type: "tween", ease: "linear", duration: 1.2 }}
                onAnimationComplete={() => setIsCopied(false)}
                className="absolute -z-10 inset-0 bg-mauve-300 rounded-full"
              />

              <CheckCircle className="size-5 text-mauve-600" />
              <span className="font-semibold text-mauve-600">Code Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-view"
              {...idleMotion}
              transition={{ type: "tween", duration: 0.15 }}
              className="size-full flex items-center justify-between pl-5 pr-1.5"
            >
              <span className="font-semibold text-mauve-400 select-none tracking-wide">492837</span>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "h-10 px-4 inline-flex items-center justify-center rounded-full bg-white font-medium shadow-lg cursor-pointer",
                  "hover:bg-mauve-50 focus:scale-95 focus-visible:outline-1 focus-visible:outline-offset-1",
                  "transition-[background-color,scale] ease-out-cubic will-change-transform",
                )}
              >
                <span className="mb-0.5 text-mauve-600">Copy</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { InlineCopyToast, WalletAddressInlineCopy, ApiKeyInlineCopy, CouponCodeInlineCopy };
