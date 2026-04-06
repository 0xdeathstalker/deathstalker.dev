"use client";

import type { MotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

type TLightboxContext = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };

const LightboxContext = React.createContext<TLightboxContext | null>(null);

function useLightboxContext() {
  const ctx = React.useContext(LightboxContext);
  if (!ctx) throw new Error("Error! Lightbox components should be wrapped by LightboxContextProvider (Lightbox).");

  return ctx;
}

function Lightbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <LightboxContext.Provider value={{ open, setOpen }}>
      <LightboxOverlay />
      {children}
    </LightboxContext.Provider>
  );
}

function LightboxTrigger({ className, ...props }: React.ComponentProps<"div"> & MotionProps) {
  const { setOpen } = useLightboxContext();

  return (
    <motion.div
      layoutId="lightbox-card"
      className={cn("p-4 border overflow-hidden", className)}
      style={{ borderRadius: 10 }}
      onClick={() => setOpen(true)}
      {...props}
    />
  );
}

function LightboxOverlay() {
  const { open } = useLightboxContext();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/20 absolute inset-0 z-50"
        />
      ) : null}
    </AnimatePresence>
  );
}

function LightboxContent({ className, ...props }: React.ComponentProps<"div"> & MotionProps) {
  const { open, setOpen } = useLightboxContext();
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  useOnClickOutside(cardRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 grid place-items-center z-50">
          <motion.div
            layoutId="lightbox-card"
            ref={cardRef}
            className={cn(
              "h-fit max-w-[calc(100vw-1rem)] md:max-w-[calc(100vw-7rem)]",
              "p-4 md:p-6 flex flex-col items-start border",
              className,
            )}
            style={{ borderRadius: 14 }}
            {...props}
          />
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export { Lightbox, LightboxTrigger, LightboxOverlay, LightboxContent };
