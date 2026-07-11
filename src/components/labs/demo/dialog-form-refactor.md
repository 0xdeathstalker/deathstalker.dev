# dialog-form — remaining work

## Open points on the original demo (`dialog-form.demo.tsx`)

1. **Remove the `as` cast on the ref** (`~L22`)
   `dialogRef as React.RefObject<HTMLDivElement>` lies to the compiler about nullability — `useRef<HTMLDivElement>(null)` is `RefObject<HTMLDivElement | null>`. Upgrade `usehooks-ts` (v3+ accepts nullable refs) to delete the cast — or moot the point by retiring the original demo once the composed version reaches parity (the composed version has no `useOnClickOutside` at all).

2. **Hardcoded error message** — the `<p>error</p>` in the original demo's footer always renders. Resolved in the composed version: `DialogFormError` now shows the real context error from a rejected `action`. Goes away entirely with the original demo's retirement.

3. **Optional polish: repeated label + input blocks** could be extracted into a small `Field` component once the form grows — not urgent for a demo (avoid hasty abstraction), but the name/email/message blocks are triplicated in both demos now.

---

# Base UI migration (`src/components/ui/dialog-form.tsx`)

## Done

- **`DialogForm` (root)** — controlled Base UI `Root` (AnimatePresence owns unmount timing), controlled + uncontrolled `open` support, rest props forwarded to `Root` (`modal`, `actionsRef`, …), `MotionConfig` with default spring overridable via `transition` prop, context provides `open`/`setOpen`, instance-scoped `getLayoutId` (`useId` prefix — multi-instance safe), and `formId` (reserved, not yet consumed).
- **`DialogFormTrigger`** — `HTMLMotionProps<"button">` merged onto Base UI `Trigger` via `render`; default `"wrapper"` layoutId.
- **`DialogFormContent`** — `AnimatePresence` + `{open && <Portal keepMounted>}` + `Popup render={<motion.div/>}`; default `exit={{ opacity: 0 }}`; `container` prop for in-place portaling.
- **`DialogFormTitle` / `DialogFormTitleLabel`** — Base UI `Title` (auto `aria-labelledby`) + shared-element `"title"` layoutId span used in both trigger and title.
- **Morph verified (Plan A)** — trigger stays mounted; Motion's layoutId lead/follower stack hides it while the popup is lead and transfers back on exit. No Plan B needed. Rationale documented in file comments.
- **Transform-free centering** — composed demo panel uses `absolute inset-0 m-auto h-fit` instead of translate classes, so Motion has exclusive ownership of inline `transform` during the morph.
- **Free from Base UI** — focus trap, initial focus, focus return, Escape, outside-click dismiss, background `inert`, aria wiring. All hand-rolled equivalents from the original are absent from the composed version by design.
- **`DialogFormBody`** — `motion.form` (`HTMLMotionProps<"form">`) whose `id` defaults to the context `formId`; `onSubmit`/`action` pass through untouched. Body-as-form was a deliberate call: the form/submit linkage is this family's value-add over the plain Dialog (shadcn's Dialog has no Body part at all — consumers hand-write the `<form>` there). Overriding `id` means also overriding `form` on `DialogFormSubmit`.
- **`DialogFormFooter`** — `motion.div` layout slot, mirrors shadcn's `DialogFooter` but accepts motion props.
- **`DialogFormSubmit`** — `motion.button` with `type="submit" form={formId}` from context; the platform `form` attribute links it from outside the `<form>` element (portal-safe).
- **`DialogFormError`** — `aria-live="polite"` slot; stays mounted even when empty because live regions only announce content *changes*.
- **Success/error submission state** — the root context owns `status` ("idle" | "submitting" | "success" | "error") + `error`, exposed via `useDialogForm()`. `DialogFormBody` takes `action(formData)`: resolve → success, throw → error message into `DialogFormError` (which now defaults to the context error). `DialogFormView` (wrapping Body + Footer, with a `success` node prop) owns the form↔success swap internally (`AnimatePresence mode="popLayout" initial={false}`; panel height animates via the layoutId wrapper) — consumers never touch presence logic. `DialogFormSubmit` auto-disables while submitting and exposes `data-status`. State resets on *reopen*, not close (avoids swapping views mid-exit-fade). Success does NOT auto-close — caller-controlled via `useDialogForm().setOpen(false)`.
  **Hard-won constraint:** the swap region must sit BELOW `DialogFormTitle`, never wrap it — a nested `AnimatePresence` masks the outer presence state from its subtree, so a layoutId element inside it (the title label) loses its reverse morph on dialog close. The first attempt put the swap in `DialogFormContent` around all children (label popped on close); `propagate` on the inner presence was tried next and destabilized border-radius/exit animations on motion v12. `DialogFormView` below the title is the resolution: Body/Footer carry no layoutIds, so they're safe inside. The title still leaves in the success state via a plain conditional unmount inside `DialogFormTitle` (`status === "success" → null`) — an unmount, deliberately not an animated exit (that would need the forbidden nested presence); the label's leadership returns to the Motion-hidden trigger label so nothing visibly pops, and the removal is absorbed by the swap's crossfade + height morph.
- **Submit button pending spinner** — `DialogFormSubmit` swaps its label for a spinner (default lucide `Loader`, overridable via `spinner` prop) while status is "submitting", using an internal keyed `AnimatePresence mode="popLayout"` slide (enter from above, exit below — Emil's button-states pattern). Keyed by rendered content, not raw status, so error → idle doesn't replay the swap. `layout` on the button animates the width change (overridable). `relative overflow-hidden` are baked defaults the animation depends on. The nested presence is safe: no layoutIds inside (same rule as DialogFormView).
- **Anchored-widget positioning** (replaces the old "fixed-positioning variant" idea) — the root renders a `relative w-fit` anchor wrapper around the trigger which doubles as the default portal container; consumers pin the panel's corner to the trigger's corner (`absolute bottom-0 right-0` for a bottom-right widget). No backdrop part, `modal={false}` by default (no scroll lock / background inert — Escape and outside-click still dismiss), collision handling deliberately out of scope: whoever places the trigger picks the corner with room. Popover primitive evaluated and rejected: its required Positioner writes transforms and re-measures mid-animation, fighting the layoutId morph; corner-pinning needs no engine.

## Remaining steps

1. **Parity sign-off + retirement** — compare both demos one last time, then swap the lab to render `DialogFormComposedDemo`, delete the original `DialogFormDemo` (removes `usehooks-ts` usage, `FOCUSABLE_SELECTOR`, the focus-trap effect, and the commented-out inner `AnimatePresence`), and drop the `-composed` id suffixes.

2. **Registry packaging** — when distributing shadcn-registry style: declare `motion` and `@base-ui/react` in the registry item's `dependencies`, keep `className` passthrough + `data-slot` attributes on every part, and consider `inert`/`modal` notes in the component docs.
