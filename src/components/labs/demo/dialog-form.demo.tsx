"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";

function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}>
      <div>
        <AnimatePresence>
          {!open ? (
            <motion.button
              key="dialog-form-trigger"
              type="button"
              layoutId="dialog-form-wrapper"
              onClick={() => setOpen(true)}
              className={cn(
                "bg-mauve-100 h-9 px-4 enabled:active:scale-95 transition-[scale] ease-in-out",
                "border border-mauve-200",
              )}
              style={{ borderRadius: 12 }}
            >
              <motion.span
                layoutId="form-title"
                className="inline-flex items-center gap-2 leading-loose"
              >
                <MessageCircle className="size-4" />
                Contact us
              </motion.span>
            </motion.button>
          ) : (
            <motion.div
              key="dialog-form"
              ref={dialogRef}
              layoutId="dialog-form-wrapper"
              exit={{ transition: { type: "spring", bounce: 0.1, duration: 0.5 } }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-lg bg-mauve-100",
                "border border-mauve-200 overflow-hidden",
              )}
              style={{ borderRadius: 16 }}
            >
              <h1 className="px-4 py-2.5">
                <motion.span
                  layoutId="form-title"
                  className="inline-flex items-center gap-2 leading-loose"
                >
                  <MessageCircle className="size-4" />
                  Contact us
                </motion.span>
              </h1>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key="child-component"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="px-4"
                >
                  <form
                    id="contact-form"
                    className="space-y-2"
                    onSubmit={(event) => event.preventDefault()}
                  >
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
                          className="bg-mauve-50 border border-mauve-300"
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
                          className="bg-mauve-50 border border-mauve-300"
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
                        id="message"
                        rows={5}
                        className="bg-mauve-50 border border-mauve-300"
                      />
                    </div>
                  </form>
                </motion.div>

                <motion.div
                  key="dialog-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                  className="px-4 pt-2.5 pb-3.5 flex items-center justify-between"
                >
                  <p className="text-sm text-red-500">error</p>
                  <motion.button
                    type="submit"
                    form="contact-form"
                    className={cn(buttonVariants({ variant: "default" }), "h-9 rounded-lg")}
                  >
                    Submit
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export { DialogFormDemo };
