"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { HTMLMotionProps, Transition } from "motion/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A dialog that morphs open from its trigger via Motion's shared `layoutId`
 * projection, built on Base UI Dialog for the accessibility contract (focus
 * trap, focus return, Escape, outside-click, aria wiring, background inert).
 *
 * The morph works WITHOUT unmounting the trigger: Base UI keeps the trigger
 * mounted while open (it needs the element to restore focus on close), and
 * when the popup mounts with the same `layoutId`, Motion's projection stack
 * promotes it to "lead" and automatically hides the still-mounted trigger
 * (the "follower"). On exit, leadership transfers back and the trigger
 * reappears — so no conditional rendering of the trigger is ever needed.
 *
 * All `layoutId`s are prefixed with a `React.useId()` instance id so multiple
 * dialogs on one page can't morph into each other.
 *
 * Positioning model: this is an anchored widget, not a centered modal. The
 * root renders a `relative w-fit` anchor wrapper around the trigger, which is
 * also the default portal container — so the panel positions against the
 * trigger's box wherever it sits in the UI. Consumers pin the panel's corner
 * to the trigger's corner on DialogFormContent (e.g. `absolute bottom-0
 * right-0` for a bottom-right widget expands up-and-left), and the morph
 * grows the panel out of the pill from that shared corner. No backdrop, and
 * non-modal by default (`modal={false}`: no scroll lock, no background inert)
 * because the widget is meant to coexist with the page, not interrupt it.
 * Collision handling is deliberately out of scope — whoever places the
 * trigger picks the corner that has room.
 */
const DEFAULT_TRANSITION: Transition = { type: "spring", bounce: 0.15, duration: 0.6 };

type DialogFormContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  getLayoutId: (part: "wrapper" | "title") => string;
  formId: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
};

const DialogFormContext = React.createContext<DialogFormContextValue | null>(null);

function useDialogForm() {
  const context = React.useContext(DialogFormContext);
  if (!context) {
    throw new Error("useDialogForm must be used within <DialogForm>");
  }
  return context;
}

type DialogFormProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  transition?: Transition;
  /** Classes for the `relative w-fit` anchor wrapper the root renders. */
  className?: string;
  // Narrowed from Base UI's `ReactNode | render function`: children live
  // inside the anchor wrapper div, so a render function can't be forwarded.
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof DialogPrimitive.Root>, "children">;

function DialogForm({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  transition = DEFAULT_TRANSITION,
  // Non-modal by default: the widget coexists with the page (no scroll lock,
  // no background inert). Escape + outside-click dismissal still work.
  modal = false,
  className,
  children,
  ...props
}: DialogFormProps) {
  const instanceId = React.useId();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  // The root must run controlled even for uncontrolled consumers: exit
  // animations require AnimatePresence (not Base UI) to decide when the
  // popup leaves the React tree, and that only works if open state lives here.
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const contextValue = React.useMemo<DialogFormContextValue>(
    () => ({
      open,
      setOpen,
      getLayoutId: (part) => `dialog-form-${instanceId}-${part}`,
      formId: `dialog-form-${instanceId}-form`,
      anchorRef,
    }),
    [open, setOpen, instanceId],
  );

  return (
    <DialogFormContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>
        <DialogPrimitive.Root
          {...props}
          modal={modal}
          open={open}
          onOpenChange={setOpen}
        >
          {/* The anchor: shrink-wraps the trigger and doubles as the default
              portal container, so the panel positions against the trigger's
              box wherever the component is placed. */}
          <div
            ref={anchorRef}
            data-slot="dialog-form"
            className={cn("relative w-fit", className)}
          >
            {children}
          </div>
        </DialogPrimitive.Root>
      </MotionConfig>
    </DialogFormContext.Provider>
  );
}

type DialogFormTriggerProps = HTMLMotionProps<"button">;

function DialogFormTrigger({ layoutId, children, ...props }: DialogFormTriggerProps) {
  const { getLayoutId } = useDialogForm();

  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-form-trigger"
      // `render` merges Base UI's props (open/close handler, ref, aria state)
      // onto the motion element, so motion props and a11y wiring coexist on
      // one DOM node. Sharing the "wrapper" layoutId with DialogFormContent
      // is what produces the morph; Motion hides this button while the popup
      // is lead (see file header).
      render={
        <motion.button
          type="button"
          layoutId={layoutId ?? getLayoutId("wrapper")}
          {...props}
        >
          {children}
        </motion.button>
      }
    />
  );
}

type DialogFormContentProps = HTMLMotionProps<"div"> & {
  container?: DialogPrimitive.Portal.Props["container"];
};

function DialogFormContent({ container, layoutId, exit = { opacity: 0 }, children, ...props }: DialogFormContentProps) {
  const { open, getLayoutId, anchorRef } = useDialogForm();

  // Exit animations need all three pieces below: the controlled root keeps
  // `open` ours, `{open && ...}` gives AnimatePresence a conditional child it
  // can hold in the tree while the exit plays, and `keepMounted` stops Base UI
  // from ripping out the popup DOM on the first closed frame — without it the
  // panel disappears instantly instead of fading/morphing back.
  //
  // The portal defaults to the root's anchor wrapper, so `absolute` classes
  // on the panel pin it to the trigger's box (`bottom-0 right-0` = expand
  // up-and-left from a bottom-right trigger). Pass `container` to portal
  // elsewhere; the layoutId morph survives portaling because Motion measures
  // viewport boxes.
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal
          keepMounted
          container={container ?? anchorRef}
        >
          <DialogPrimitive.Popup
            data-slot="dialog-form-content"
            render={
              <motion.div
                layoutId={layoutId ?? getLayoutId("wrapper")}
                exit={exit}
                {...props}
              >
                {children}
              </motion.div>
            }
          />
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

type DialogFormTitleProps = DialogPrimitive.Title.Props;

function DialogFormTitle({ ...props }: DialogFormTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-form-title"
      {...props}
    />
  );
}

type DialogFormTitleLabelProps = HTMLMotionProps<"span">;

// The shared-element label: render one inside the trigger and one inside
// DialogFormTitle and the same "title" layoutId makes the text/icon glide
// between them during the morph, exactly like the wrapper elements do.
function DialogFormTitleLabel({ layoutId, ...props }: DialogFormTitleLabelProps) {
  const { getLayoutId } = useDialogForm();

  return (
    <motion.span
      data-slot="dialog-form-title-label"
      layoutId={layoutId ?? getLayoutId("title")}
      {...props}
    />
  );
}

type DialogFormBodyProps = HTMLMotionProps<"form">;

// The body IS the <form> — the form/submit linkage is what this family adds
// over a plain Dialog. `id` defaults to the context formId so DialogFormSubmit
// can target it via the platform `form` attribute from outside the form
// element (the footer sits outside <form> for layout). Overriding `id` means
// also overriding `form` on DialogFormSubmit — they must move together.
function DialogFormBody({ id, ...props }: DialogFormBodyProps) {
  const { formId } = useDialogForm();

  return (
    <motion.form
      data-slot="dialog-form-body"
      id={id ?? formId}
      {...props}
    />
  );
}

type DialogFormFooterProps = HTMLMotionProps<"div">;

function DialogFormFooter({ ...props }: DialogFormFooterProps) {
  return (
    <motion.div
      data-slot="dialog-form-footer"
      {...props}
    />
  );
}

type DialogFormErrorProps = React.ComponentProps<"p">;

// Rendered even when empty: a live region only announces content *changes*,
// so the element must already be in the DOM before an error appears.
function DialogFormError({ ...props }: DialogFormErrorProps) {
  return (
    <p
      data-slot="dialog-form-error"
      aria-live="polite"
      {...props}
    />
  );
}

type DialogFormSubmitProps = HTMLMotionProps<"button">;

function DialogFormSubmit({ ...props }: DialogFormSubmitProps) {
  const { formId } = useDialogForm();

  return (
    <motion.button
      data-slot="dialog-form-submit"
      type="submit"
      form={formId}
      {...props}
    />
  );
}

export {
  DialogForm,
  DialogFormBody,
  DialogFormContent,
  DialogFormError,
  DialogFormFooter,
  DialogFormSubmit,
  DialogFormTitle,
  DialogFormTitleLabel,
  DialogFormTrigger,
  useDialogForm,
};
