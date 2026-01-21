"use client";

import Image from "next/image";
import * as React from "react";
import { useCodingHours } from "@/lib/hooks/useCodingHours";

function CodingHours() {
  const { data: time, isLoading, isError } = useCodingHours();

  if (isError) {
    return null;
  }

  if (isLoading) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  return (
    <div className="flex items-center text-muted-foreground text-xs">
      <Image
        src="/images/cursor-light.svg"
        alt="cursor logo"
        width={12}
        height={12}
        className="mr-1.5"
      />

      <p>
        Yesterday worked for{" "}
        <span className="text-sm text-foreground">
          {time?.hours ? `${time.hours}h` : null} {time?.minutes ?? 0}m
        </span>
      </p>
    </div>
  );
}

export { CodingHours };
