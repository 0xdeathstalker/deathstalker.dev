"use client";

import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import PosthogPageView from "@/lib/posthog/posthog-page-vew";
import { CSPostHogProvider } from "@/lib/posthog/posthog-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CSPostHogProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* smooth scrolling */}
          <ReactLenis root>{children}</ReactLenis>
          <React.Suspense>
            <PosthogPageView />
          </React.Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </CSPostHogProvider>
  );
}
