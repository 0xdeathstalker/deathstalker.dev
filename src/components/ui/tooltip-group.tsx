"use client";

import { Slot } from "@radix-ui/react-slot";
import type { MotionProps, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

type TGroupContext = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  clearCloseTimer: () => void;
  scheduleClose: () => void;
};

const GroupContext = React.createContext<TGroupContext | null>(null);

function TooltipGroup({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearCloseTimer = React.useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveId(null), 100);
  }, []);

  React.useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const contextValue = React.useMemo(
    () => ({ activeId, setActiveId, clearCloseTimer, scheduleClose }),
    [activeId, clearCloseTimer, scheduleClose],
  );

  return <GroupContext.Provider value={contextValue}>{children}</GroupContext.Provider>;
}

function useGroupContext() {
  const context = React.useContext(GroupContext);

  if (!context) {
    throw new Error("useGroupContext must be used within a TooltipGroup provider");
  }

  return context;
}

type TooltipContext = {
  contentId: string;
  open: boolean;
  skipEnterAnimation: React.RefObject<boolean>;
  skipExitAnimation: boolean;
  handleEnter: () => void;
  handleLeave: () => void;
};

const TooltipContext = React.createContext<TooltipContext | null>(null);

const tooltipVariants = {
  exit: (skipExitAnimation: boolean) =>
    skipExitAnimation ? { opacity: 0, y: 0, transition: { duration: 0 } } : { opacity: 0, y: 6 },
} satisfies Variants;

function useTooltipContext() {
  const context = React.useContext(TooltipContext);

  if (!context) {
    throw new Error("useTooltipContext must be used within a Tooltip provider");
  }

  return context;
}

function composeEventHandlers<Event extends React.SyntheticEvent>(
  userHandler: ((event: Event) => void) | undefined,
  internalHandler: (event: Event) => void,
) {
  return (event: Event) => {
    userHandler?.(event);

    if (!event.defaultPrevented) {
      internalHandler(event);
    }
  };
}

function Tooltip({ id, children }: { id: string; children: React.ReactNode }) {
  const skipEnterAnimation = React.useRef(false);

  const { activeId, setActiveId, clearCloseTimer, scheduleClose } = useGroupContext();
  const contentId = React.useId();
  const open = activeId === id;
  const skipExitAnimation = activeId !== null && activeId !== id;

  const handleEnter = React.useCallback(() => {
    clearCloseTimer();
    skipEnterAnimation.current = activeId !== null && activeId !== id;
    setActiveId(id);
  }, [activeId, clearCloseTimer, id, setActiveId]);

  const handleLeave = React.useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const contextValue = React.useMemo(
    () => ({
      contentId,
      open,
      skipEnterAnimation,
      skipExitAnimation,
      handleEnter,
      handleLeave,
    }),
    [contentId, open, skipExitAnimation, handleEnter, handleLeave],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  className,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { handleEnter, handleLeave } = useTooltipContext();

  return (
    <Slot
      {...props}
      onPointerEnter={composeEventHandlers(onPointerEnter, handleEnter)}
      onPointerLeave={composeEventHandlers(onPointerLeave, handleLeave)}
      onFocus={composeEventHandlers(onFocus, handleEnter)}
      onBlur={composeEventHandlers(onBlur, handleLeave)}
      className={cn(className)}
    />
  );
}

function TooltipContent({ className, id: _id, ...props }: React.ComponentProps<"div"> & MotionProps) {
  const { contentId, open, skipEnterAnimation, skipExitAnimation } = useTooltipContext();

  return (
    <AnimatePresence custom={skipExitAnimation}>
      {open && (
        <motion.div
          {...props}
          id={contentId}
          role="tooltip"
          custom={skipExitAnimation}
          variants={tooltipVariants}
          initial={skipEnterAnimation.current ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit="exit"
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none px-2.5 py-1.25 rounded-md text-xs",
            className,
          )}
        />
      )}
    </AnimatePresence>
  );
}

export { TooltipGroup, Tooltip, TooltipTrigger, TooltipContent };
