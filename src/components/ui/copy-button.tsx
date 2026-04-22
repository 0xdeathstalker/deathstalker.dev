"use client";

import { CircleXIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, type HTMLMotionProps, motion, type Variants } from "motion/react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { type CopyState, useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { useWebHaptics } from "web-haptics/react";

const motionVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(3px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.8, filter: "blur(3px)" },
};

const motionProps: HTMLMotionProps<"div"> = {
  variants: motionVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
};

type CopyStateIconProps = {
  state: CopyState;
  copyIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
};

function CopyStateIcon({ state, copyIcon, successIcon, errorIcon }: CopyStateIconProps) {
  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
    >
      {state === "idle" ? (
        <motion.div
          key="idle"
          {...motionProps}
        >
          {copyIcon ?? <CopyIcon className="-scale-x-100" />}
        </motion.div>
      ) : state === "success" ? (
        <motion.div
          key="success"
          {...motionProps}
        >
          {successIcon ?? <CheckCircle />}
        </motion.div>
      ) : state === "error" ? (
        <motion.div
          key="error"
          {...motionProps}
        >
          {errorIcon ?? <CircleXIcon />}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type CopyButtonProps = React.ComponentProps<typeof Button> & {
  text: string;
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
} & Pick<CopyStateIconProps, "copyIcon" | "successIcon" | "errorIcon">;

function CopyButton({
  size = "icon",
  text,
  copyIcon,
  successIcon,
  errorIcon,
  onCopySuccess,
  onCopyError,
  children,
  className,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess,
    onCopyError,
  });

  return (
    <Button
      size={size}
      onClick={() => {
        copy(text);
      }}
      className={cn("size-6 enabled:active:scale-[0.97]", className)}
      {...props}
    >
      <CopyStateIcon
        state={state}
        copyIcon={copyIcon}
        successIcon={successIcon}
        errorIcon={errorIcon}
      />
      {children}
    </Button>
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
      ></path>
    </svg>
  );
}

export { CopyButton, CopyStateIcon };
