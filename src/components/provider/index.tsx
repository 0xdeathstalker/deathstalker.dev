"use client";

import { ReactLenis } from "lenis/react";
import type * as React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
