# dialog-form — remaining work

## Open points on the original demo (`dialog-form.demo.tsx`)

1. **Remove the `as` cast on the ref** (`~L22`)
   `dialogRef as React.RefObject<HTMLDivElement>` lies to the compiler about nullability — `useRef<HTMLDivElement>(null)` is `RefObject<HTMLDivElement | null>`. Upgrade `usehooks-ts` (v3+ accepts nullable refs) to delete the cast — or moot the point by retiring the original demo once the composed version reaches parity (the composed version has no `useOnClickOutside` at all).

2. **Hardcoded error message** — the `<p>error</p>` in the footer always renders. Fixed by the `DialogFormError` slot in the migration (step 4 below), not patched in place.

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

## Remaining steps

1. **`DialogFormBody`** — renders `<form id={formId}>` (formId from context) around consumer fields; accepts `onSubmit` (call `preventDefault` internally or accept a React 19 `action`). Replaces the demo's hand-written `id="contact-form-composed"`.

2. **`DialogFormFooter`** — plain layout `div` slot (`React.ComponentProps<"div">`), mirrors shadcn's `DialogFooter`.

3. **`DialogFormSubmit`** — `HTMLMotionProps<"button">` rendering `type="submit" form={formId}` from context; the platform `form` attribute links it to the body's form from outside the `<form>` element (portal-safe). Replaces the demo's hand-written `form="contact-form-composed"`.

4. **`DialogFormError`** — conditional error slot with `aria-live="polite"`; renders nothing when there's no error. Closes open point 2 above.

5. **Decide submission semantics** — does a successful submit auto-close, or does the caller drive it via `onOpenChange` / `useDialogForm()`? Lean caller-controlled (matches the controlled-root design); document the chosen contract in the file comments.

6. **Fixed-positioning variant** — the demo portals in-place via `container`; for the distributable component decide the default when `container` is omitted: portal to `<body>` needs `fixed` centering classes and probably an optional backdrop part (`DialogFormBackdrop`, skippable like the demo does).

7. **Parity sign-off + retirement** — once body/footer/submit land, compare both demos one last time, then swap the lab to render `DialogFormComposedDemo`, delete the original `DialogFormDemo` (removes `usehooks-ts` usage, `FOCUSABLE_SELECTOR`, the focus-trap effect, and the commented-out inner `AnimatePresence`), and drop the `-composed` id suffixes.

8. **Registry packaging** — when distributing shadcn-registry style: declare `motion` and `@base-ui/react` in the registry item's `dependencies`, keep `className` passthrough + `data-slot` attributes on every part, and consider `inert`/`modal` notes in the component docs.
