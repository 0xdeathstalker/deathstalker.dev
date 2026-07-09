# dialog-form.demo.tsx — points to improve

## Bugs

1. **Broken label association on the message field** (`~L114-123`)
   The label has `htmlFor="message"` but the `Textarea` has no `id="message"`. Clicking the label does nothing and screen readers announce an unlabeled field. Add `id="message"` to the `Textarea`.

2. **Submit button triggers a native form submit / page reload** (`~L137`)
   The `motion.button` inside the footer has no `type`, so it defaults to `type="submit"`. Either set `type="button"`, or wire a real `onSubmit` handler on the `<form>` with `preventDefault()` (or a React 19 form action). Note the button also sits *outside* the `<form>` element — it needs `form="<form-id>"` or to be moved inside for submit to work at all.

## Type safety

3. **Remove the `as` cast on the ref** (`~L16`)
   `dialogRef as React.RefObject<HTMLDivElement>` lies to the compiler about nullability — `useRef<HTMLDivElement>(null)` is `RefObject<HTMLDivElement | null>`. Upgrade `usehooks-ts` (v3+ accepts nullable refs) so the cast can be deleted instead of papering over the version mismatch.

## Accessibility / dialog semantics

4. **It's a dialog visually but not behaviorally.** Missing:
   - `role="dialog"` and `aria-modal="true"` on the container
   - Focus trap — keyboard users can tab behind the dialog
   - Focus moved into the dialog on open, and returned to the trigger on close
   - `aria-labelledby` pointing at the title
   Preferred fix: get the semantics from a primitive (Radix/shadcn `Dialog` or native `<dialog>`) and layer the Motion animation on top, instead of hand-rolling Escape + outside-click and skipping the rest.

5. **`h1` for the dialog title** (`~L65`)
   A widget embedded in a page shouldn't own an `h1` — it breaks the document outline. Use a lower heading (or a `p`/`div`) referenced via `aria-labelledby`.

6. **Email input has the wrong type** (`~L108`)
   `type="text"` should be `type="email"` for validation and mobile keyboards.

## Form fundamentals

7. **Inputs have no `name` attributes** — a real submit would send nothing. Add `name="name"`, `name="email"`, `name="message"`.

8. **Hardcoded error message** (`~L136`)
   `<p>error</p>` always renders. Make it conditional on actual error state and add `aria-live="polite"` so screen readers announce it.

## Motion / effects

9. **Inner `AnimatePresence` is dead code** (`~L75`)
   Its two children mount and unmount together with the parent dialog, so their `exit` animations never run — when the dialog closes, the outer `AnimatePresence` unmounts the whole subtree, inner presence included. Either remove it (keep the `initial`/`animate` fade-in on plain `motion.div`s) or add the multi-step content-swapping state that `mode="popLayout"` is actually for.

10. **Escape listener runs unconditionally** (`~L18-27`)
    The `window` keydown listener is attached for the component's entire lifetime and fires `setOpen(false)` even when the dialog is closed. Gate the effect on `open` (add it to deps, early-return when closed) — or it disappears entirely with a dialog primitive (see point 4).

## Layout

11. **Fixed width overflows small viewports** (`~L60`)
    `w-lg` with absolute centering will overflow on mobile. Use something like `w-[32rem] max-w-[calc(100vw-2rem)]`.

## Optional polish

12. **Repeated label + input blocks** could be extracted into a small `Field` component once the form grows — not urgent for a demo (avoid hasty abstraction), but the name/email/message blocks are already triplicated boilerplate.
