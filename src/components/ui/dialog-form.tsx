"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { HTMLMotionProps, Transition } from "motion/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";

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
 */
const DEFAULT_TRANSITION: Transition = { type: "spring", bounce: 0.15, duration: 0.6 };

type DialogFormContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  getLayoutId: (part: "wrapper" | "title") => string;
  formId: string;
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
} & React.ComponentProps<typeof DialogPrimitive.Root>;

function DialogForm({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  transition = DEFAULT_TRANSITION,
  children,
  ...props
}: DialogFormProps) {
  const instanceId = React.useId();
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
    }),
    [open, setOpen, instanceId],
  );

  return (
    <DialogFormContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>
        <DialogPrimitive.Root
          {...props}
          open={open}
          onOpenChange={setOpen}
        >
          {children}
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

function DialogFormContent({
  container,
  layoutId,
  exit = { opacity: 0 },
  children,
  ...props
}: DialogFormContentProps) {
  const { open, getLayoutId } = useDialogForm();

  // Exit animations need all three pieces below: the controlled root keeps
  // `open` ours, `{open && ...}` gives AnimatePresence a conditional child it
  // can hold in the tree while the exit plays, and `keepMounted` stops Base UI
  // from ripping out the popup DOM on the first closed frame — without it the
  // panel disappears instantly instead of fading/morphing back.
  //
  // `container` portals in-place (e.g. a demo card) instead of <body>; the
  // layoutId morph survives portaling because Motion measures viewport boxes.
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal
          keepMounted
          container={container}
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

export {
  DialogForm,
  DialogFormContent,
  DialogFormTitle,
  DialogFormTitleLabel,
  DialogFormTrigger,
  useDialogForm,
};
