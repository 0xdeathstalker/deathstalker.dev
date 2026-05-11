"use client";

import * as React from "react";
import { MorphText } from "@/components/ui/morph-text";
import { Button } from "@/components/ui/button";
import { useWebHaptics } from "web-haptics/react";

const buttonStates = {
  idle: "Submit",
  loading: "Submitting",
  success: "Submitted",
};

function MorphTextDemo() {
  const [state, setState] = React.useState<"idle" | "loading" | "success">("idle");
  const { trigger } = useWebHaptics();

  function handleClick() {
    trigger();
    setState("loading");

    setTimeout(() => {
      setState("success");

      setTimeout(() => {
        setState("idle");
      }, 1000);
    }, 1500);
  }

  return (
    <Button
      variant="default"
      className="bg-mauve-700 hover:bg-mauve-800 w-48 h-12 text-xl rounded-[20px] enabled:active:scale-[0.97]"
      onClick={handleClick}
    >
      <MorphText className="font-medium font-sans">{buttonStates[state]}</MorphText>
    </Button>
  );
}

export { MorphTextDemo };
