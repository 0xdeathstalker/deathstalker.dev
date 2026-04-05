"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";

function Lightbox() {
  const [open, setOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(contentRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <React.Fragment>
      <motion.div
        layoutId="image-card"
        className="bg-background p-4 border border-border/40 rounded-lg overflow-hidden"
        onClick={() => setOpen(true)}
      >
        <motion.img
          layoutId="image"
          src="/images/labs/clip-path-transition-tabs.svg"
          alt="clip path calculation logic"
          width={634}
          height={400}
        />
      </motion.div>

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

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.div
              layoutId="image-card"
              ref={contentRef}
              className={cn(
                "bg-background h-fit max-w-[calc(100vw-1rem)] md:max-w-[calc(100vw-7rem)]",
                "p-4 md:p-6 flex flex-col items-start gap-4 rounded-lg",
              )}
            >
              <motion.img
                layoutId="image"
                src="/images/labs/clip-path-transition-tabs.svg"
                alt="clip path calculation logic"
              />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </React.Fragment>
  );
}

export { Lightbox };
