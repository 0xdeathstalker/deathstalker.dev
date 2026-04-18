import { BackButton } from "@/components/back-button";
import { LabNavigation } from "@/components/labs/lab-navigation";
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
  const currentIndex = labs.findIndex((l) => l.slug === slug);
  const component = labs[currentIndex];
  const prevSlug = labs[currentIndex + 1]?.slug ?? null;
  const nextSlug = labs[currentIndex - 1]?.slug ?? null;

  return (
    <div className="pt-18 min-[840px]:pt-28">
      <div className="min-[840px]:hidden px-4 pb-4 flex items-center justify-between">
        <BackButton href="/labs">labs</BackButton>

        <LabNavigation
          prevSlug={prevSlug}
          nextSlug={nextSlug}
        />
      </div>

      <Title
        title={component?.title}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />

      <div className="py-6 px-4">
        <p className="mt-1 mb-6 text-sm text-muted-foreground">{component?.subHeading}</p>

        <div className="relative min-h-96 grid place-items-center border border-mauve-200 rounded-xl p-2 overflow-hidden last:mb-4">
          {component?.component && <component.component />}
        </div>

        <div className="space-y-6 mt-10 text-sm [&>*:last-child]:mb-4">{component?.description}</div>
      </div>

      <QuoteTime />
    </div>
  );
}

function Title({
  title,
  prevSlug,
  nextSlug,
}: {
  title: string | undefined;
  prevSlug: string | null;
  nextSlug: string | null;
}) {
  return (
    <div className="relative p-4">
      <div className="absolute right-full top-1/2 -translate-y-1/2 pr-4 hidden min-[840px]:flex">
        <BackButton href="/labs">labs</BackButton>
      </div>

      <h1 className="font-pixel-square text-3xl md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
        {title}
      </h1>

      <div className="absolute left-full top-1/2 -translate-y-1/2 pl-4 hidden min-[840px]:flex">
        <LabNavigation
          prevSlug={prevSlug}
          nextSlug={nextSlug}
        />
      </div>

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

function BackToLabsButton() {
  return (
    <Link
      href="/labs"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-7 has-[>svg]:pl-2 gap-1 text-xs text-mauve-500 hover:text-mauve-600",
      )}
    >
      <BackIcon />
      labs
    </Link>
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
