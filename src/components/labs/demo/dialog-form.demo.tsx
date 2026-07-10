"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DialogForm,
  DialogFormBody,
  DialogFormContent,
  DialogFormError,
  DialogFormFooter,
  DialogFormSubmit,
  DialogFormTitle,
  DialogFormTitleLabel,
  DialogFormTrigger,
} from "@/components/ui/dialog-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);
  const titleId = React.useId();

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  useOnClickOutside(dialogRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  React.useEffect(() => {
    if (!open) return;

    function getFocusables() {
      return Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);
    }

    getFocusables()[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "Tab") {
        const focusables = getFocusables();
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}>
      <div>
        <AnimatePresence>
          {!open ? (
            <motion.button
              key="dialog-form-trigger"
              ref={triggerRef}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              layoutId="dialog-form-wrapper"
              exit={{ opacity: 0 }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] sm:w-lg",
                "bg-mauve-100 border border-mauve-200 overflow-hidden",
              )}
              style={{ borderRadius: 16 }}
            >
              <h2
                id={titleId}
                className="px-4 py-2.5"
              >
                <motion.span
                  layoutId="form-title"
                  className="inline-flex items-center gap-2 leading-loose"
                >
                  <MessageCircle className="size-4" />
                  Contact us
                </motion.span>
              </h2>

              {/* <AnimatePresence mode="popLayout"> */}
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
                        name="name"
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
                        name="email"
                        type="email"
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
                      name="message"
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
              {/* </AnimatePresence> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function DialogFormComposedDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <DialogForm>
        <DialogFormTrigger
          className={cn(
            "bg-mauve-100 h-9 px-4 enabled:active:scale-95 transition-[scale] ease-in-out",
            "border border-mauve-200",
          )}
          style={{ borderRadius: 12 }}
        >
          <DialogFormTitleLabel className="inline-flex items-center gap-2 leading-loose">
            <MessageCircle className="size-4" />
            Contact us
          </DialogFormTitleLabel>
        </DialogFormTrigger>

        <DialogFormContent
          container={containerRef}
          className={cn(
            // inset-0 + m-auto + h-fit centers without translate classes, which
            // would fight Motion for the inline transform during the morph
            "absolute inset-0 m-auto h-fit w-[calc(100vw-2rem)] sm:w-lg",
            "bg-mauve-100 border border-mauve-200 overflow-hidden",
          )}
          style={{ borderRadius: 16 }}
        >
          <DialogFormTitle className="px-4 py-2.5">
            <DialogFormTitleLabel className="inline-flex items-center gap-2 leading-loose">
              <MessageCircle className="size-4" />
              Contact us
            </DialogFormTitleLabel>
          </DialogFormTitle>

          <DialogFormBody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="px-4 space-y-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-4">
              <div>
                <label
                  htmlFor="name-composed"
                  className="ml-0.5 text-xs text-muted-foreground"
                >
                  Name
                </label>
                <Input
                  id="name-composed"
                  name="name"
                  type="text"
                  className="bg-mauve-50 border border-mauve-300"
                />
              </div>
              <div>
                <label
                  htmlFor="email-composed"
                  className="ml-0.5 text-xs text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email-composed"
                  name="email"
                  type="email"
                  className="bg-mauve-50 border border-mauve-300"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message-composed"
                className="ml-0.5 text-xs text-muted-foreground"
              >
                Message
              </label>
              <Textarea
                id="message-composed"
                name="message"
                rows={5}
                className="bg-mauve-50 border border-mauve-300"
              />
            </div>
          </DialogFormBody>

          <DialogFormFooter
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.15 }}
            className="px-4 pt-2.5 pb-3.5 flex items-center justify-between"
          >
            <DialogFormError className="text-sm text-red-500">error</DialogFormError>
            <DialogFormSubmit className={cn(buttonVariants({ variant: "default" }), "h-9 rounded-lg")}>
              Submit
            </DialogFormSubmit>
          </DialogFormFooter>
        </DialogFormContent>
      </DialogForm>
    </div>
  );
}

export { DialogFormComposedDemo, DialogFormDemo };
