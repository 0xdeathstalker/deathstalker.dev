"use client";

import { MessageCircle } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
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
  DialogFormView,
} from "@/components/ui/dialog-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
  // The demo card (relative, in labs/[slug]/page.tsx) is the "screen": the
  // widget pins to its bottom-right corner and the panel expands up-and-left
  // out of the trigger — in a real app this wrapper would be
  // `fixed bottom-4 right-4` against the viewport instead.
  return (
    <div className="absolute bottom-2 right-2">
      <DialogForm>
        <DialogFormTrigger
          className={cn(
            "bg-mauve-100 h-9 px-4 border border-mauve-200",
            "enabled:active:translate-y-0.5 enabled:focus-visible:translate-y-0.5 transition-[translate] ease-in-out",
          )}
          style={{ borderRadius: 12 }}
        >
          <DialogFormTitleLabel className="inline-flex items-center gap-2 leading-loose">
            <MessageCircle className="size-4" />
            Contact us
          </DialogFormTitleLabel>
        </DialogFormTrigger>

        <DialogFormContent
          className={cn(
            // corner-pinned to the trigger's box (the anchor wrapper): the
            // panel's bottom-right corner sits on the trigger's, expanding
            // up-and-left. No translate classes — Motion owns the transform.
            "absolute bottom-0 right-0 h-[270px] w-[calc(100vw-2rem)] sm:w-lg",
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

          <DialogFormView success={<SuccessComponent />}>
            <DialogFormBody
              className="px-4 space-y-2"
              action={async (formData) => {
                // demo stub: pretend to send, fail when the message is empty
                await new Promise((resolve) => setTimeout(resolve, 800));
                if (!formData.get("message")) {
                  throw new Error("Message cannot be empty.");
                }
              }}
            >
              <FormInputs />
            </DialogFormBody>

            <DialogFormFooter className="px-4 pt-2.5 pb-3.5 flex items-center justify-between">
              <DialogFormError className="text-sm text-red-500" />
              <DialogFormSubmit className="w-20 h-9 rounded-lg">Submit</DialogFormSubmit>
            </DialogFormFooter>
          </DialogFormView>
        </DialogFormContent>
      </DialogForm>
    </div>
  );
}

function FormInputs() {
  return (
    <>
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
    </>
  );
}

function SuccessComponent() {
  return (
    <div className="h-[270px] flex flex-col items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          fill="#2090FF"
          fillOpacity="0.16"
        />
        <path
          d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          stroke="#2090FF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3>Feedback received!</h3>
      <p>Thanks for helping me improve Sonner.</p>
    </div>
  );
}

export { DialogFormComposedDemo, DialogFormDemo };
