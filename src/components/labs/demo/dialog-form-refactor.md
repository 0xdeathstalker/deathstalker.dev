# dialog-form.demo.tsx — points to improve

## Bugs

1. ~~**Broken label association on the message field**~~ ✅ Fixed — added `id="message"` to the `Textarea` so the `htmlFor="message"` label is properly associated.

2. ~~**Submit button triggers a native form submit / page reload**~~ ✅ Fixed — the `<form>` now has `id="contact-form"` with an `onSubmit` that calls `preventDefault()`, and the footer button is explicitly `type="submit" form="contact-form"`. The `form` attribute links the button to the form even though it sits outside the `<form>` element in the DOM (works across portals too). Replace the `preventDefault()` stub with real submit logic when the form does something.

## Type safety

3. **Remove the `as` cast on the ref** (`~L16`)
   `dialogRef as React.RefObject<HTMLDivElement>` lies to the compiler about nullability — `useRef<HTMLDivElement>(null)` is `RefObject<HTMLDivElement | null>`. Upgrade `usehooks-ts` (v3+ accepts nullable refs) so the cast can be deleted instead of papering over the version mismatch.

## Accessibility / dialog semantics

4. ~~**It's a dialog visually but not behaviorally.**~~ ✅ Fixed (hand-rolled, per the Radix-vs-hand-rolled decision in future scope) — the panel now has `role="dialog"`, `aria-modal="true"`, and `aria-labelledby={titleId}` (`React.useId()`); a single `open`-gated effect focuses the first focusable element on open, traps Tab/Shift+Tab inside the panel, handles Escape, and returns focus to the trigger on close via `triggerRef`.

5. ~~**`h1` for the dialog title**~~ ✅ Fixed — demoted to `h2` with `id={titleId}` referenced by `aria-labelledby`.

6. ~~**Email input has the wrong type**~~ ✅ Fixed — now `type="email"`.

## Form fundamentals

7. ~~**Inputs have no `name` attributes**~~ ✅ Fixed — added `name="name"`, `name="email"`, `name="message"`.

8. **Hardcoded error message** (`~L176`) — ⏸ deferred to the composition-pattern refactor: the error will arrive as a prop/slot (`DialogFormError` with `aria-live="polite"`), so it gets fixed there rather than patched here.

## Motion / effects

9. ~~**Inner `AnimatePresence` is dead code**~~ ✅ Fixed
   Its two children mount and unmount together with the parent dialog, so their `exit` animations never run — when the dialog closes, the outer `AnimatePresence` unmounts the whole subtree, inner presence included. Either remove it (keep the `initial`/`animate` fade-in on plain `motion.div`s) or add the multi-step content-swapping state that `mode="popLayout"` is actually for.

10. ~~**Escape listener runs unconditionally**~~ ✅ Fixed as part of point 4 — Escape now lives in the focus-management effect, which is gated on `open` and cleans up when the dialog closes.

## Layout

11. **Fixed width overflows small viewports** (`~L60`)
    `w-lg` with absolute centering will overflow on mobile. Use something like `w-[32rem] max-w-[calc(100vw-2rem)]`.

## Optional polish

12. **Repeated label + input blocks** could be extracted into a small `Field` component once the form grows — not urgent for a demo (avoid hasty abstraction), but the name/email/message blocks are already triplicated boilerplate.

---

# Future scope: composable pattern (shadcn Dialog-style API)

Not the current goal — pain points to cover when converting this into reusable
`DialogForm` / `DialogFormTrigger` / `DialogFormContent` / `DialogFormTitle` /
`DialogFormBody` / `DialogFormFooter` / `DialogFormSubmit` parts sharing state via context.

1. **`AnimatePresence` doesn't compose across component boundaries** — the hard one.
   `AnimatePresence` only tracks its *direct* children; once Trigger and Content are separate
   user-placed components, a child that internally returns `null` never registers as an exit.
   Fix: each part owns its own `AnimatePresence` (`{!open && <motion.button/>}` inside Trigger,
   `{open && <motion.div/>}` inside Content) with the root wrapping everything in a `LayoutGroup`
   so the shared `layoutId` morph still connects them. Prototype this first — it constrains
   everything else.

2. **Hardcoded `layoutId`s break with multiple instances.** `"dialog-form-wrapper"` and
   `"form-title"` are global — two dialogs on one page would morph into each other. Prefix every
   `layoutId` with the instance's `React.useId()` shared via context.

3. **Radix vs hand-rolled.** Radix Dialog gives the a11y contract free (focus trap, `aria-modal`,
   focus return, Escape) but its Trigger stays mounted while open, which fights the layoutId morph
   (needs `forceMount` + visibility hacks). Decision: stay hand-rolled to keep the morph clean,
   which means owning the a11y checklist ourselves — `role="dialog"`, `aria-modal="true"`,
   `aria-labelledby={titleId}`, focus into the panel on open, focus restored to trigger on close,
   focus trap.

4. **Escape + outside-click move into Content, gated on `open`.** The window keydown effect and
   `useOnClickOutside` belong inside `DialogFormContent`, active only while open — this also fixes
   the always-attached listener and removes the `as` cast site.

5. **Controlled + uncontrolled open state.** Support both `<DialogForm>` (internal state) and
   `<DialogForm open={open} onOpenChange={setOpen}>` (shadcn/Radix convention). Cheap now,
   painful to retrofit.

6. **Form ↔ submit-button linkage via context.** Root generates `formId` with `useId()`;
   `DialogFormBody` renders `<form id={formId} onSubmit={...}>`; `DialogFormSubmit` renders
   `type="submit" form={formId}` — the platform `form` attribute works from anywhere in the
   document, including portals. Decide submission semantics: does success auto-close, or does the
   caller control it (via `onOpenChange` / a `useDialogForm()` hook)? Hardcoded error becomes a
   `DialogFormError` slot with `aria-live="polite"`.

7. **Portal or in-place positioning.** Real dialogs portal to `<body>` to escape stacking
   contexts; `form` attribute and `layoutId` (under one `LayoutGroup`) both survive portaling,
   but the current `absolute` centering assumes a positioned ancestor. Keep in-place for the labs
   demo card; switch to portal + `fixed` for the reusable component.

**Suggested order:** 1 (morph prototype) → 2, 5 (context + ids) → 6 (form linkage) → 3, 4 (a11y) → error slot and polish.
