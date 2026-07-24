"use client";

import { Slot } from "@radix-ui/react-slot";
import { ChevronLeft } from "lucide-react";
import type { MotionProps } from "motion/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

type NestedMenuItem = {
  id: string;
  label: string;
  children?: Array<NestedMenuItem>;
  [key: string]: unknown;
};

type NavigationEntry = {
  stack: Array<NestedMenuItem>;
  title: string;
};

type ContextValue = {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;

  activeItems: Array<NestedMenuItem>;
  history: Array<NavigationEntry>;
  parentTitle: string | undefined;

  direction: -1 | 1;
  canGoBack: boolean;

  goForward: ({ subItems, title }: { subItems: Array<NestedMenuItem>; title: string }) => void;
  goBack: () => void;

  height: number | undefined;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const BORDER_HEIGHT = 2;

const defaultTransition = { type: "spring", bounce: 0, duration: 0.15 } as const;

const slideVariants = {
  initial: (direction: -1 | 1) => ({ x: `${110 * direction}%` }),
  animate: { x: "0%" },
  exit: (direction: -1 | 1) => ({ x: `${-110 * direction}%` }),
};

const NestedMenuContext = React.createContext<ContextValue | null>(null);

function useMenu() {
  const context = React.useContext(NestedMenuContext);
  if (!context) {
    throw new Error("NestedDropdownMenu components must be used inside root NestedDropdownMenu component.");
  }

  return context;
}

type NestedDropdownMenuProps = {
  items: Array<NestedMenuItem>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
} & Omit<React.ComponentProps<"div">, "children">;

function NestedMenu({
  items,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
  className,
  ...props
}: NestedDropdownMenuProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  function setOpen(value: boolean | ((prev: boolean) => boolean)) {
    const next = typeof value === "function" ? value(open) : value;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  const [activeItems, setActiveItems] = React.useState<Array<NestedMenuItem>>(items);
  const [history, setHistory] = React.useState<Array<NavigationEntry>>([]);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  const containerRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  function goForward({ subItems, title }: { subItems: Array<NestedMenuItem>; title: string }) {
    setDirection(1);
    setActiveItems(subItems);
    setHistory((prev) => [...prev, { stack: subItems, title }]);
  }

  function goBack() {
    const newHistory = history.slice(0, -1);
    setDirection(-1);
    setActiveItems(newHistory.at(-1)?.stack ?? items);
    setHistory(newHistory);
  }

  React.useEffect(() => {
    if (!open) {
      setActiveItems(items);
      setHistory([]);
      setDirection(1);
    }
  }, [open, items]);

  return (
    <NestedMenuContext.Provider
      value={{
        open,
        setOpen,
        activeItems,
        history,
        direction,
        canGoBack: history.length > 0,
        parentTitle: history.at(-1)?.title,
        goForward,
        goBack,
        height,
        setHeight,
      }}
    >
      <MotionConfig transition={{ duration: 0.15 }}>
        <div
          ref={containerRef}
          className={cn("inline-block relative", className)}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </NestedMenuContext.Provider>
  );
}

type TriggerProps = { asChild?: boolean } & React.ComponentProps<"button">;

function NestedMenuTrigger({ asChild, className, onClick, children, ...props }: TriggerProps) {
  const { setOpen } = useMenu();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    setOpen((prev) => !prev);
  }

  if (asChild) {
    return (
      <Slot
        onClick={handleClick}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

type ContentProps = React.ComponentProps<"div"> & MotionProps & { transition?: object };

function NestedMenuContent({ children, className, transition, ...props }: ContentProps) {
  const { open, height } = useMenu();

  if (!open) return null;

  return (
    <motion.div
      data-open={open}
      initial={false}
      animate={height !== undefined ? { height: height + BORDER_HEIGHT } : undefined}
      transition={transition ?? defaultTransition}
      className={cn("overflow-hidden will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function NestedMenuViewport({ className, children, ...props }: React.ComponentProps<"div">) {
  const { open, setHeight } = useMenu();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open || !ref.current) return;

    const element = ref.current;
    setHeight(element.clientHeight);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.target.clientHeight);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [open, setHeight]);

  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

type NestedMenuListProps = {
  renderItem: (item: NestedMenuItem) => React.ReactNode;
  transition?: object;
} & React.ComponentProps<"ul"> &
  MotionProps;

function NestedMenuList({ renderItem, transition, className, children, ...props }: NestedMenuListProps) {
  const { activeItems, direction, history } = useMenu();

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
      custom={direction}
    >
      <motion.ul
        key={history.length}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        transition={transition ?? defaultTransition}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
        {activeItems.map((item) => renderItem(item))}
      </motion.ul>
    </AnimatePresence>
  );
}

type NestedMenuListItemProps = {
  item: NestedMenuItem;
  asChild?: boolean;
} & React.ComponentProps<"button">;

function NestedMenuListItem({ item, asChild, children, onClick, className, ...props }: NestedMenuListItemProps) {
  const { goForward } = useMenu();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (item.children?.length) {
      goForward({ subItems: item.children, title: item.label });
    }
  }

  if (asChild) {
    return (
      <Slot
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

type BackButtonProps = React.ComponentProps<"button"> & {
  iconClassName?: string;
};

function NestedMenuBackButton({ onClick, className, iconClassName, children, ...props }: BackButtonProps) {
  const { canGoBack, goBack, parentTitle } = useMenu();

  if (!canGoBack) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        goBack();
      }}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <ChevronLeft className={cn("size-3.5", iconClassName)} />
      <span>{parentTitle}</span>
    </button>
  );
}

export {
  NestedMenu,
  NestedMenuBackButton,
  NestedMenuContent,
  NestedMenuList,
  NestedMenuListItem,
  NestedMenuTrigger,
  NestedMenuViewport,
};
