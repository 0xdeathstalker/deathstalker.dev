"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import type { HTMLMotionProps, Transition } from "motion/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A dialog that morphs open from its trigger via Motion's shared `layoutId`
 * projection, built on Base UI Dialog.
 *
 * The morph works WITHOUT unmounting the trigger: Base UI keeps the trigger
 * mounted while open (since it needs the element to restore focus on close),
 * and when the popup mounts with the same `layoutId`, Motion's projection stack
 * promotes it to "lead" and automatically hides the still-mounted trigger
 * (the "follower"). On exit, leadership transfers back and the trigger
 * reappears — so no conditional rendering of the trigger is ever needed.
 *
 * All `layoutId`s are prefixed with a `React.useId()` instance id so multiple
 * dialogs on one page can't morph into each other.
 *
 * Positioning model: this is an anchored widget, not a centered modal. The
 * root renders a `relative w-fit` anchor wrapper around the trigger, which is
 * also the default portal container, so the panel positions against the
 * trigger's box wherever it sits in the UI. Consumers pin the panel's corner
 * to the trigger's corner on DialogFormContent (e.g. `absolute bottom-0
 * right-0` for a bottom-right widget expands up-and-left) and the morph
 * grows the panel out of the pill from that shared corner. No backdrop and
 * non-modal by default (`modal={false}`: no scroll lock, no background inert)
 * because the widget is meant to coexist with the page, not interrupt it.
 *
 * Collision handling is deliberately out of scope, whoever places the
 * trigger picks the corner that has room.
 */

const DEFAULT_TRANSITION: Transition = { type: "spring", bounce: 0.15, duration: 0.6 };

type DialogFormStatus = "idle" | "submitting" | "success" | "error";

type DialogFormContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  getLayoutId: (part: "wrapper" | "title") => string;
  formId: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  status: DialogFormStatus;
  error: React.ReactNode;
  setStatus: (status: DialogFormStatus, error?: React.ReactNode) => void;
  reset: () => void;
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
  className?: string;
  // Narrowed from Base UI's `ReactNode | render function`: children live
  // inside the anchor wrapper div, so a render function can't be forwarded.
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof DialogPrimitive.Root>, "children">;

function DialogFormModal({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  transition = DEFAULT_TRANSITION,
  modal = false, // non-modal by default
  className,
  children,
  ...props
}: DialogFormProps) {
  const instanceId = React.useId();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [submission, setSubmission] = React.useState<{
    status: DialogFormStatus;
    error: React.ReactNode;
  }>({ status: "idle", error: null });

  // The root must run controlled even for uncontrolled consumers: exit
  // animations require AnimatePresence to decide when the popup leaves
  // the React tree and that only works if open state lives here.
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) setSubmission({ status: "idle", error: null });
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
      status: submission.status,
      error: submission.error,
      setStatus: (status, error = null) => setSubmission({ status, error }),
      reset: () => setSubmission({ status: "idle", error: null }),
    }),
    [open, setOpen, instanceId, submission],
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
      // `render` merges Base UI's props onto the motion element,
      // so motion props and a11y wiring coexist on one DOM node.
      // Sharing the "wrapper" layoutId with DialogFormContent is
      // what produces the morph; Motion hides this button while
      // the popup is lead.
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
  // can hold in the tree while the exit plays and `keepMounted` stops Base UI
  // from ripping out the popup DOM on the first closed frame. Without it the
  // panel disappears instantly instead of fading/morphing back.
  //
  // Pass `container` to portal elsewhere; the layoutId morph survives
  // portaling because Motion measures viewport boxes.
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
  const { status } = useDialogForm();

  // The title leaves in the success state. The success view owns the whole
  // panel. This is a plain unmount, not an animated exit: the title can't
  // live inside the swap region or any nested AnimatePresence without
  // breaking the label's close morph (see DialogFormView), so it removes
  // itself instead.
  if (status === "success") return null;

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

type DialogFormViewProps = HTMLMotionProps<"div"> & {
  // Shown in place of this view's children once submission succeeds.
  success?: React.ReactNode;
};

function DialogFormView({ success, children, ...props }: DialogFormViewProps) {
  const { status } = useDialogForm();

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
    >
      {status === "success" && success ? (
        <motion.div
          key="dialog-form-success"
          data-slot="dialog-form-success"
          initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          {...props}
        >
          {success}
        </motion.div>
      ) : (
        <motion.div
          key="dialog-form-view"
          data-slot="dialog-form-view"
          exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DialogFormBodyProps = Omit<HTMLMotionProps<"form">, "action"> & {
  /**
   * Submission handler: resolve → success view swaps in; throw/reject → the
   * error's message lands in DialogFormError. The component owns
   * preventDefault, status flags and all animation. Consumers own only
   * what happens with the data.
   */
  action?: (formData: FormData) => void | Promise<void>;
};

function DialogForm({ id, action, onSubmit, ...props }: DialogFormBodyProps) {
  const { formId, setStatus } = useDialogForm();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    // A consumer onSubmit may still veto (e.g. custom validation).
    onSubmit?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setStatus("submitting");
    try {
      await action?.(formData);
      setStatus("success");
    } catch (error) {
      setStatus("error", error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <motion.form
      data-slot="dialog-form-body"
      id={id ?? formId}
      onSubmit={action ? handleSubmit : onSubmit}
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
// Defaults to the context error set by a rejected DialogForm `action`;
// pass children to display something else.
function DialogFormError({ children, ...props }: DialogFormErrorProps) {
  const { error } = useDialogForm();

  return (
    <p
      data-slot="dialog-form-error"
      aria-live="polite"
      {...props}
    >
      {children ?? error}
    </p>
  );
}

type DialogFormSubmitProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & { spinner?: React.ReactNode };

// NO `layout` prop is set here because a layout-animated node inside
// the panel gets its own entry animation during the open morph,
// visibly detaching the button from the rest of the content.
function DialogFormSubmit({
  disabled,
  className,
  variant,
  size,
  spinner = <Loader className="size-4 animate-spin" />,
  children,
  ...props
}: DialogFormSubmitProps) {
  const { formId, status } = useDialogForm();
  const submitting = status === "submitting";

  return (
    <motion.button
      data-slot="dialog-form-submit"
      type="submit"
      form={formId}
      // Guards against double-submission while the spinner shows.
      disabled={disabled ?? submitting}
      data-status={status}
      className={cn(buttonVariants({ variant, size }), "relative overflow-hidden", className)}
      {...props}
    >
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        <motion.span
          key={submitting ? "spinner" : "label"}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="inline-flex items-center justify-center"
        >
          {submitting ? spinner : children}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export {
  DialogFormModal,
  DialogForm,
  DialogFormContent,
  DialogFormError,
  DialogFormFooter,
  DialogFormSubmit,
  DialogFormTitle,
  DialogFormTitleLabel,
  DialogFormTrigger,
  DialogFormView,
  useDialogForm,
};
