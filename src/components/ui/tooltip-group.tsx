"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TGroupContext = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  clearCloseTimer: () => void;
  scheduleClose: () => void;

  getActiveId: () => string | null;
  getPrevActiveId: () => string | null;
};

const GroupContext = React.createContext<TGroupContext | null>(null);

function TooltipGroup({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveIdState] = React.useState<string | null>(null);
  const prevActiveId = React.useRef<string | null>(null);
  const activeIdRef = React.useRef<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearCloseTimer = React.useCallback(() => clearTimeout(closeTimer.current), []);

  const setActiveId = React.useCallback((id: string | null) => {
    prevActiveId.current = activeIdRef.current;
    activeIdRef.current = id;
    setActiveIdState(id);
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveId(null), 100);
  }, [setActiveId]);

  const getActiveId = React.useCallback(() => activeIdRef.current, []);
  const getPrevActiveId = React.useCallback(() => prevActiveId.current, []);

  React.useEffect(() => clearTimeout(closeTimer.current), []);

  const contextValue = React.useMemo(
    () => ({ activeId, setActiveId, clearCloseTimer, scheduleClose, getActiveId, getPrevActiveId }),
    [activeId, setActiveId, clearCloseTimer, scheduleClose, getActiveId, getPrevActiveId],
  );

  return (
    <TooltipProvider>
      <GroupContext.Provider value={contextValue}>{children}</GroupContext.Provider>
    </TooltipProvider>
  );
}

function useGroupContext() {
  const context = React.useContext(GroupContext);
  if (!context) throw new Error("useGroupContext must be used within a TooltipGroup provider");
  return context;
}

type TTooltipItemContext = {
  skipEnter: boolean;
  skipExit: boolean;
};

const TooltipItemContext = React.createContext<TTooltipItemContext | null>(null);

function useTooltipItemContext() {
  const context = React.useContext(TooltipItemContext);
  if (!context) throw new Error("useTooltipItemContext must be used within a TooltipItemContext provider");
  return context;
}

function Tooltip({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeId, setActiveId, clearCloseTimer, scheduleClose, getActiveId, getPrevActiveId } = useGroupContext();

  const open = activeId === id;

  const prevId = getPrevActiveId();
  const skipEnter = open && prevId !== null && prevId !== id;
  const skipExit = !open && prevId === id && activeId !== null;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        clearCloseTimer();
        setActiveId(id);
      } else if (getActiveId() === id) {
        scheduleClose();
      }
    },
    [id, clearCloseTimer, setActiveId, scheduleClose, getActiveId],
  );

  return (
    <TooltipItemContext.Provider value={{ skipEnter, skipExit }}>
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
      >
        {children}
      </TooltipPrimitive.Root>
    </TooltipItemContext.Provider>
  );
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & { showArrow?: boolean };

function TooltipContent({ className, sideOffset = 0, showArrow = false, children, ...props }: TooltipContentProps) {
  const { skipEnter, skipExit } = useTooltipItemContext();

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          !skipEnter && !skipExit && "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          skipExit && "data-[state=closed]:invisible",
          !showArrow && "mb-1",
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipGroup, Tooltip, TooltipTrigger, TooltipContent };
