"use client";

import * as React from "react";
import { Line } from "@/components/ui/line";
import { portfolio } from "@/lib/config/site-data";
import Socials from "./socials";

export default function Hero() {
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "h":
          event.preventDefault();
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "p":
          event.preventDefault();
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "b":
          event.preventDefault();
          document.getElementById("builds")?.scrollIntoView({ behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section id="hero">
      <Title />

      <Bio />
    </section>
  );
}

function Title() {
  return (
    <div className="relative py-4 px-4 max-[690px]:px-8">
      <Line
        orientation="horizontal"
        position="top"
        color="text-muted-foreground/15"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-muted-foreground/15"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 sm:justify-between">
        <h1 className="text-4xl font-medium text-shadow-sm dark:shadow-black/65">{portfolio.author}</h1>

        <Socials />
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="relative py-10 px-4 max-[690px]:px-8 ">
      <Line
        orientation="horizontal"
        position="bottom"
        variant="contained"
        color="text-muted-foreground/15"
        className="max-w-[650px]"
      />

      <div className="space-y-4">
        {portfolio.bio.map((b, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={i}
            className="text-muted-foreground leading-relaxed"
          >
            {b}
          </p>
        ))}
      </div>
    </div>
  );
}
