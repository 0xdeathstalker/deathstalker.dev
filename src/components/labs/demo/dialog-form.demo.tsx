"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";

function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  // TODO: esc key tracking

  return (
    <div>
      <AnimatePresence>
        {!open ? (
          <motion.button
            key="dialog-form-trigger"
            type="button"
            layoutId="dialog-form-wrapper"
            onClick={() => setOpen(true)}
            className="bg-mauve-200 h-9 px-4 enabled:active:scale-95 transition-[scale] ease-in-out"
            style={{ borderRadius: 12 }}
          >
            <motion.span
              layoutId="form-title"
              className="inline-block"
            >
              Contact us
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            key="dialog-form"
            ref={dialogRef}
            layoutId="dialog-form-wrapper"
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-lg bg-mauve-200"
            style={{ borderRadius: 16 }}
          >
            <h1 className="px-4 py-2.5">
              <motion.span
                layoutId="form-title"
                className="inline-block"
              >
                Contact us
              </motion.span>
            </h1>

            <AnimatePresence mode="popLayout">
              <motion.div
                key="child-component"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4"
              >
                <form className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="ml-0.5 text-xs text-muted-foreground"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        className="border border-mauve-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="ml-0.5 text-xs text-muted-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="text"
                        className="border border-mauve-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="ml-0.5 text-xs text-muted-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      rows={5}
                      className="border border-mauve-300"
                    />
                  </div>
                </form>
              </motion.div>

              <motion.div
                key="dialog-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 pt-2.5 pb-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-red-500">error</p>
                <motion.button className={cn(buttonVariants({ variant: "default" }), "h-9 rounded-lg")}>
                  Submit
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { DialogFormDemo };
