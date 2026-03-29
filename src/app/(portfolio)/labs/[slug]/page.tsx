import { BackButton } from "@/components/back-button";
import { QuoteTime } from "@/components/sections/quote-time";
import { buttonVariants } from "@/components/ui/button";
import { CornerBorder } from "@/components/ui/corner-border";
import { Line } from "@/components/ui/line";
import { labs } from "@/lib/config/labs-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const component = labs.find((l) => l.slug === slug);

  return (
    <div className="pt-18 min-[840px]:pt-28">
      <div className="min-[840px]:hidden px-4 pb-4">
        <BackButton />
      </div>

      <Title title={component?.title} />

      <div className="py-6 px-4">
        <p className="mt-1 mb-6 text-sm text-muted-foreground">{component?.subHeading}</p>

        <div className="relative min-h-96 grid place-items-center border border-mauve-300 rounded-xl p-2 overflow-hidden">
          {component?.component && <component.component />}
        </div>

        <div className="space-y-6 mt-10 text-sm">{component?.description}</div>
      </div>

      <QuoteTime />
    </div>
  );
}

function Title({ title }: { title: string | undefined }) {
  return (
    <div className="relative p-4">
      <div className="absolute right-full top-1/2 -translate-y-1/2 pr-4 hidden min-[840px]:flex">
        <BackButton />
      </div>

      <h1 className="font-pixel-square text-3xl md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
        {title}
      </h1>

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

      <CornerBorder />
    </div>
  );
}
