"use client";

import PosthogPageView from "@/lib/posthog/posthog-page-vew";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import * as React from "react";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root>{children}</ReactLenis>
      <React.Suspense>
        <PosthogPageView />
      </React.Suspense>
    </QueryClientProvider>
  );
}
