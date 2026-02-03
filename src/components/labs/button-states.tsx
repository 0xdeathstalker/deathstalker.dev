"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import * as React from "react";

type ButtonState = "idle" | "loading" | "success" | "failure";

function SubmitButtonStates() {
  return (
    <div className="h-full flex items-center justify-center gap-6 sm:gap-24">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span>Success</span>
        <SuccessButton />
      </div>

      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span>Failure</span>
        <FailureButton />
      </div>
    </div>
  );
}

const BUTTON_STATES: Record<ButtonState, { label: React.ReactNode; className?: string }> = {
  idle: { label: "Submit" },
  loading: {
    label: (
      <>
        <Loader className="animate-spin size-4 shrink-0 mr-1" /> Submitting
      </>
    ),
  },
  success: {
    label: "Success!",
    className: "text-green-700",
  },
  failure: {
    label: "Failed",
    className: "text-red-700",
  },
};

function SuccessButton() {
  const [buttonState, setButtonState] = React.useState<ButtonState>("idle");

  function handleSuccess() {
    if (buttonState !== "idle") return;

    setButtonState("loading");
  }

  React.useEffect(() => {
    if (buttonState === "loading") {
      const timer = setTimeout(() => setButtonState("success"), 1000);
      return () => clearTimeout(timer);
    }

    if (buttonState === "success") {
      const timer = setTimeout(() => setButtonState("idle"), 1000);
      return () => clearTimeout(timer);
    }
  }, [buttonState]);

  return (
    <button
      type="button"
      className={cn(
        "relative cursor-pointer h-12 border rounded-lg px-12 sm:px-14 font-medium text-indigo-500/80 text-lg enabled:hover:bg-indigo-100/60 enabled:active:scale-95 transition-all ease-in-out duration-150 disabled:cursor-not-allowed",
        buttonState === "success"
          ? "bg-green-200 border-green-500/20"
          : buttonState === "failure"
            ? "bg-red-200 border-red-500/20"
            : "bg-indigo-50 border-indigo-500/20",
      )}
      onClick={handleSuccess}
      disabled={buttonState !== "idle"}
    >
      {(Object.keys(BUTTON_STATES) as ButtonState[]).map((state) => (
        <span
          key={state}
          aria-hidden={buttonState !== state}
          className={cn(
            state !== "idle" && "absolute inset-0 flex items-center justify-center",
            "transition-all ease-out duration-200",
            buttonState === state ? "opacity-100 blur-none" : "opacity-0 blur-sm",
            BUTTON_STATES[state].className,
          )}
        >
          {BUTTON_STATES[state].label}
        </span>
      ))}
    </button>
  );
}

function FailureButton() {
  const [buttonState, setButtonState] = React.useState<ButtonState>("idle");

  function handleFailure() {
    if (buttonState !== "idle") return;

    setButtonState("loading");
  }

  React.useEffect(() => {
    if (buttonState === "loading") {
      const timer = setTimeout(() => setButtonState("failure"), 2000);
      return () => clearTimeout(timer);
    }

    if (buttonState === "failure") {
      const timer = setTimeout(() => setButtonState("idle"), 1000);
      return () => clearTimeout(timer);
    }
  }, [buttonState]);

  return (
    <button
      type="button"
      className={cn(
        "relative cursor-pointer h-12 border rounded-lg px-12 sm:px-14 font-medium text-indigo-500/80 text-lg enabled:hover:bg-indigo-100/60 enabled:active:scale-95 transition-all ease-in-out duration-150 disabled:cursor-not-allowed",
        buttonState === "success"
          ? "bg-green-200 border-green-500/20"
          : buttonState === "failure"
            ? "bg-red-200 border-red-500/20"
            : "bg-indigo-50 border-indigo-500/20",
      )}
      onClick={handleFailure}
      disabled={buttonState !== "idle"}
    >
      {(Object.keys(BUTTON_STATES) as ButtonState[]).map((state) => (
        <span
          key={state}
          className={cn(
            state !== "idle" && "absolute inset-0 flex items-center justify-center",
            "transition-all ease-out duration-200",
            buttonState === state ? "opacity-100 blur-none" : "opacity-0 blur-sm",
            BUTTON_STATES[state].className,
          )}
        >
          {BUTTON_STATES[state].label}
        </span>
      ))}
    </button>
  );
}

export { FailureButton, SubmitButtonStates, SuccessButton };
