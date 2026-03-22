import * as React from "react";

export type CopyState = "idle" | "success" | "error";

function useCopyToClipboard({
  onCopySuccess,
  onCopyError,
  resetDelay = 2000,
}: {
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  resetDelay?: number;
} = {}) {
  const [copyState, setCopyState] = React.useState<CopyState>("idle");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = React.useCallback(
    async (text: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopyState("success");
        onCopySuccess?.(text);
      } catch (error) {
        setCopyState("error");
        onCopyError?.(error instanceof Error ? error : new Error("Failed to copy text!"));
      } finally {
        timeoutRef.current = setTimeout(() => {
          setCopyState("idle");
        }, resetDelay);
      }
    },
    [onCopyError, onCopySuccess, resetDelay],
  );

  return { state: copyState, copy };
}

export { useCopyToClipboard };
