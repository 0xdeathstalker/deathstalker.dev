import { ScrollGradients } from "@/components/scroll-gradients";
import { Footer } from "@/components/sections/footer";
import { QuoteTime } from "@/components/sections/quote-time";
import { buttonVariants } from "@/components/ui/button";
import { Line } from "@/components/ui/line";
import { type ComponentTitles, labsComponents } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug as ComponentTitles;
  const Component = labsComponents[slug];

  return (
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <ScrollGradients />

      <VerticalLines />

      <div className="pt-28 mx-auto max-w-[650px] max-[690px]:mx-4">
        <div className="relative p-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 has-[>svg]:pl-2 gap-1 text-xs text-mauve-400 hover:text-mauve-500",
            )}
          >
            <BackIcon />
            Back
          </Link>

          <Line
            orientation="horizontal"
            position="top"
            color="text-mauve-500/65"
          />
          <Line
            orientation="horizontal"
            position="bottom"
            color="text-mauve-500/65"
          />
        </div>

        <div className="py-6 px-4">
          <h2 className="text-xl font-semibold">shared layout animation</h2>
          <p className="mt-1 mb-10 text-sm text-muted-foreground">
            an example demonstrating shared layout animation with motion.
          </p>

          <div className="relative min-h-96 grid place-items-center border border-mauve-300 rounded-xl p-2 overflow-hidden">
            {Component && <Component />}
          </div>

          <div className="space-y-6 mt-10 text-sm">
            <p>
              i tried to recreate the shared layout animation between a grid of items and a full screen modal using
              motion. at first this might seem to be difficult but one can easily get the hang of it once he understands
              the core principle.
            </p>

            <p>
              with the help of{" "}
              <Link
                href="https://www.framer.com/motion/layout-animations/#shared-layout-animations"
                target="_blank"
                className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
              >
                shared layout animations support
              </Link>{" "}
              from motion, we can easily connect two elements and create a smooth transition between them. we don't need
              to move an item to have the morph effect.
            </p>

            <p>
              the trick here is to connect the two elements with{" "}
              <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">layoutId</code> which
              indicates the motion library to smoothly transition between them. we also need{" "}
              <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">Animate Presence</code> to
              create the exit animation for the modal and overlay.{" "}
              <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">Animate Presence</code>{" "}
              component is used to keep the exiting element in the DOM until its exit animation has finished.
            </p>
          </div>
        </div>

        <QuoteTime />
      </div>

      <Footer />
    </main>
  );
}

function VerticalLines() {
  return (
    <div className="absolute inset-0 max-w-[650px] max-[690px]:mx-4 mx-auto pointer-events-none">
      <Line
        orientation="vertical"
        position="left"
        color="text-mauve-500/65"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-mauve-500/65"
      />
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3.5 shrink-0 select-none"
    >
      <path
        d="M10.2069 4H12.4828C13.3203 4 14 4.67972 14 5.51724V10.4483C14 11.2858 13.3203 11.9655 12.4828 11.9655H3M3 11.9655L6.03448 8.93103M3 11.9655L6.03448 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}
