import { env } from "@/env";
import Script from "next/script";

function UmamiAnalytics() {
  const umamiSrc = env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = env.NEXT_PUBLIC_UMAMI_ID;

  if (env.NODE_ENV === "development" || env.NODE_ENV === "test") {
    console.log("Umami Analytics disabled in development/test environment.");
    return null;
  }

  if (!umamiSrc || !umamiId) {
    console.error("Umami Analytics not configured.");
    return null;
  }

  return (
    <Script
      id="umami-analytics"
      src={umamiSrc}
      data-website-id={umamiId}
      strategy="afterInteractive"
      async
    />
  );
}

export { UmamiAnalytics };
