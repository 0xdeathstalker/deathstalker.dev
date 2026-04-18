"use client";

import { BackButton } from "@/components/back-button";
import { ScrollGradients } from "@/components/scroll-gradients";
import { LabItem } from "@/components/sections/lab-item";
import { QuoteTime } from "@/components/sections/quote-time";
import { CornerBorder } from "@/components/ui/corner-border";
import { Line } from "@/components/ui/line";
import { labs } from "@/lib/config/labs-data";

export default function LabsPage() {
  return (
    <div className="relative pt-18 min-[840px]:pt-28">
      <ScrollGradients />

      <div className="min-[840px]:hidden px-4 pb-4 flex items-center justify-between">
        <BackButton href="/">home</BackButton>
      </div>

      <section id="hero">
        <div className="relative p-4">
          <div className="absolute right-full top-1/2 -translate-y-1/2 pr-4 hidden min-[840px]:flex">
            <BackButton href="/">home</BackButton>
          </div>

          <CornerBorder />

          <Line
            orientation="horizontal"
            position="top"
            color="text-mauve-500/65"
          />

          <h1 className="font-pixel-square text-3xl md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
            labs
          </h1>

          <Line
            orientation="horizontal"
            position="bottom"
            color="text-mauve-500/65"
          />
        </div>
      </section>

      <div className="space-y-4 py-4">
        {[...labs].reverse().map((lab, idx) => {
          const isLast = idx !== labs.length - 1;

          return (
            <LabItem
              key={`${lab.title}-${idx}`}
              lab={lab}
              isLast={isLast}
            />
          );
        })}
      </div>

      <QuoteTime />
    </div>
  );
}
