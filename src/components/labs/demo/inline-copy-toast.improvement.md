# InlineCopyToast — Improvement Notes

## Functionality

1. **No actual clipboard write.** Button only flips state. Add `navigator.clipboard.writeText(code)` in the click handler (with a fallback/`catch` since it can reject).
2. **Code is a hardcoded inline literal.** Extract `const CODE = "492817"` (or accept a `code` prop) so display and clipboard share one source.
3. **Timer and progress bar are separately timed magic numbers.** `setTimeout(1800)` vs progress wipe `duration: 1.5` — wipe finishes 300ms before the view reverts. Either sync via one shared constant or drop the `setTimeout` entirely and reset in the progress bar's `onAnimationComplete`.

## Accessibility

4. **Success message isn't announced.** Wrap the toast region in `aria-live="polite"` so screen readers hear "Code Copied!".
5. **Focus is lost on copy.** The button is unmounted while focused (keyboard flow), dropping focus to `<body>`. Keep the button mounted (visually swapped) or restore focus when idle view returns.
6. **No `prefers-reduced-motion` handling.** Blur/scale animations should collapse to simple fades via `useReducedMotion()` or a `MotionConfig reducedMotion="user"` at app level.
7. **`select-none` on the code** blocks manual text selection — a copy UI should not prevent copying by hand.

## Code quality

8. **`motion.button` has no motion props** — plain `<button>` works; one less animated node.
9. **`enabled:focus:scale-95`** — button is never disabled, so `enabled:` is dead; and press feedback usually belongs on `active:`, not `focus:` (focus-scale makes keyboard-focused button look pressed).
10. **Redundant wrapper div.** Outer `relative w-fit overflow-hidden rounded-full` duplicates the inner pill; move `relative` onto the inner div and delete the outer.
11. **`-z-10` on the progress bar is fragile.** It only stays visible because the animated parent's `opacity` creates a stacking context. Safer: progress bar at `z-0`, content spans at `z-10`.
12. **Blur filter animation is paint-heavy.** Fine for a demo; if it ever shows jank, drop `filter` from the transitions and keep opacity/scale.

## Reusability (only if promoted beyond labs demo)

13. Accept `code`, `onCopy`, and duration as props; currently everything is baked in — fine for a demo, needed for reuse.
