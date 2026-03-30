import { AnimatePresence, type MotionProps, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

type TSharedLayoutContext<T = unknown> = {
  activeCard: T | null;
  setActiveCard: React.Dispatch<React.SetStateAction<T | null>>;
};

const SharedLayoutContext = React.createContext<TSharedLayoutContext<unknown> | null>(null);

function useSharedLayoutContext<T = unknown>() {
  const context = React.useContext(SharedLayoutContext);

  if (!context) {
    throw new Error("useSharedLayoutContext hook must be used within SharedLayoutContextProvider.");
  }

  return context as TSharedLayoutContext<T>;
}

function SharedLayout<T = unknown>({ children }: { children: React.ReactNode }) {
  const [activeCard, setActiveCard] = React.useState<T | null>(null);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SharedLayoutContext.Provider value={{ activeCard, setActiveCard } as TSharedLayoutContext<unknown>}>
      {children}
    </SharedLayoutContext.Provider>
  );
}

function SharedLayoutContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(className)}
      {...props}
    />
  );
}

type TSharedLayoutCardContext<T = unknown> = { item: T };
const SharedLayoutCardContext = React.createContext<TSharedLayoutCardContext | null>(null);

function SharedLayoutCard<T>({
  item,
  layoutId,
  className,
  ...props
}: React.ComponentProps<"li"> & MotionProps & { item: T }) {
  const { setActiveCard } = useSharedLayoutContext<T>();
  return (
    <SharedLayoutCardContext.Provider value={{ item }}>
      <motion.li
        layoutId={layoutId}
        onClick={() => setActiveCard(item)}
        className={cn("flex flex-col items-center justify-center overflow-hidden", className)}
        {...props}
      />
    </SharedLayoutCardContext.Provider>
  );
}

function SharedLayoutCardModalOverlay({ className, ...props }: React.ComponentProps<"div"> & MotionProps) {
  const { activeCard } = useSharedLayoutContext();
  return (
    <AnimatePresence>
      {activeCard ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("absolute inset-0 bg-black/20 z-50", className)}
          {...props}
        />
      ) : null}
    </AnimatePresence>
  );
}

type SharedLayoutCardModalProps<T> = {
  children: (activeCard: T) => React.ReactNode;
};

function SharedLayoutCardModal<T>({ children }: SharedLayoutCardModalProps<T>) {
  const { activeCard } = useSharedLayoutContext<T>();

  return (
    <AnimatePresence>
      {activeCard ? <div className="absolute inset-0 grid place-items-center z-50">{children(activeCard)}</div> : null}
    </AnimatePresence>
  );
}

function SharedLayoutCardModalContent<T>({
  layoutId,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div"> & MotionProps, "children"> & {
  children: React.ReactNode;
}) {
  const { setActiveCard } = useSharedLayoutContext<T>();
  const ref = React.useRef<HTMLDivElement | null>(null);
  // @ts-expect-error ref type mismatch
  useOnClickOutside(ref, () => setActiveCard(null));
  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      className={cn("mx-4 flex items-center justify-center overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export {
  SharedLayout,
  SharedLayoutContent,
  SharedLayoutCard,
  SharedLayoutCardModalOverlay,
  SharedLayoutCardModal,
  SharedLayoutCardModalContent,
};
