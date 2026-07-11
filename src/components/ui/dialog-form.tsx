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

type DialogFormStatus = "idle" | "submitting" | "success" | "error";

type DialogFormContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  getLayoutId: (part: "wrapper" | "title") => string;
  formId: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  /** Submission lifecycle. Driven by DialogFormBody's `action`, or manually via setStatus. */
  status: DialogFormStatus;
  /** Message shown by DialogFormError while status is "error". */
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
  const [submission, setSubmission] = React.useState<{
    status: DialogFormStatus;
    error: React.ReactNode;
  }>({ status: "idle", error: null });

  // The root must run controlled even for uncontrolled consumers: exit
  // animations require AnimatePresence (not Base UI) to decide when the
  // popup leaves the React tree, and that only works if open state lives here.
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      // Reset on reopen, not on close: resetting at close would swap the
      // success view back to the form mid-exit-fade.
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
  const { status } = useDialogForm();

  // The title leaves in the success state — the success view owns the whole
  // panel. This is a plain unmount, not an animated exit: the title can't
  // live inside the swap region or any nested AnimatePresence without
  // breaking the label's close morph (see DialogFormView), so it removes
  // itself instead. Nothing visible pops: the label's layout leadership
  // returns to the trigger's label, which is inside the Motion-hidden
  // trigger, and the disappearance is absorbed by the view crossfade and
  // panel-height morph running in the same frame.
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
  /**
   * Shown in place of this view's children once submission succeeds. The
   * swap is animated internally — the node needs no presence handling of its
   * own, and the panel's height morphs to fit via the layoutId wrapper.
   */
  success?: React.ReactNode;
};

// The swappable region: wrap the parts that should be replaced by `success`
// (typically Body + Footer) and keep DialogFormTitle OUTSIDE it. This part
// deliberately lives below the title rather than inside DialogFormContent:
// a nested AnimatePresence masks the outer presence state (isPresent) from
// its subtree, so anything with a layoutId inside it — like the title label —
// loses its reverse morph on dialog close. (`propagate` was tried and
// destabilized the border-radius/exit animations.) Body and Footer carry no
// layoutIds, so they're safe inside.
function DialogFormView({ success, children, ...props }: DialogFormViewProps) {
  const { status } = useDialogForm();

  // popLayout pops the exiting view out of flow so the entering one drives
  // the panel's height; initial={false} keeps the form view from replaying
  // an entrance on every open. Side effect worth knowing: initial={false}
  // propagates through PresenceContext to EVERY motion component in this
  // subtree on the presence's first render — so `initial`/`animate` entrance
  // props on Body/Footer (or anything else in here) are silently skipped at
  // dialog open. Entrance animation for panel content, if ever wanted, must
  // live outside this boundary.
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
   * preventDefault, status flags, and all animation — consumers own only
   * what happens with the data.
   */
  action?: (formData: FormData) => void | Promise<void>;
};

// The body IS the <form> — the form/submit linkage is what this family adds
// over a plain Dialog. `id` defaults to the context formId so DialogFormSubmit
// can target it via the platform `form` attribute from outside the form
// element (the footer sits outside <form> for layout). Overriding `id` means
// also overriding `form` on DialogFormSubmit — they must move together.
function DialogFormBody({ id, action, onSubmit, ...props }: DialogFormBodyProps) {
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
// Defaults to the context error set by a rejected DialogFormBody `action`;
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

type DialogFormSubmitProps = HTMLMotionProps<"button">;

function DialogFormSubmit({ disabled, ...props }: DialogFormSubmitProps) {
  const { formId, status } = useDialogForm();

  return (
    <motion.button
      data-slot="dialog-form-submit"
      type="submit"
      form={formId}
      // Guards against double-submission; style pending state via
      // data-[status=submitting]: variants or render a spinner from
      // useDialogForm().status.
      disabled={disabled ?? status === "submitting"}
      data-status={status}
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
  DialogFormView,
  useDialogForm,
};
