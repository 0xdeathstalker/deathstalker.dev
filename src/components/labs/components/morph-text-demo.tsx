"use client";

import * as React from "react";
import { MorphText } from "@/components/ui/morph-text";
import { Button } from "@/components/ui/button";

const buttonStates = {
  idle: "Submit",
  loading: "Submitting",
  success: "Submitted",
};

function MorphTextDemo() {
  const [state, setState] = React.useState<"idle" | "loading" | "success">("idle");

  function handleClick() {
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
      className="w-48 h-12 text-xl rounded-[20px]"
      onClick={handleClick}
    >
      <MorphText className="font-medium font-sans">{buttonStates[state]}</MorphText>
    </Button>
  );
}

export { MorphTextDemo };
