import { CopyButton } from "@/components/ui/copy-button";
import { CornerBorder } from "@/components/ui/corner-border";
import { Line } from "@/components/ui/line";
import { getGitHubContributions } from "@/lib/actions/github-contributions";
import { portfolio } from "@/lib/config/site-data";
import Link from "next/link";
import { CodingHours } from "./coding-hours";
import { GithubContributions } from "./github-contributions";
import Socials from "./socials";

export function Hero() {
  return (
    <section id="hero">
      <Title />

      <Bio />
    </section>
  );
}

function Title() {
  return (
    <div className="relative py-4 px-4">
      <CornerBorder />

      <Line
        orientation="horizontal"
        position="top"
        color="text-[oklch(71.4%_0.014_41.2)]/86 dark:text-muted-foreground/20"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-[oklch(71.4%_0.014_41.2)]/86 dark:text-muted-foreground/20"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-5 sm:justify-between">
        <h1 className="text-[32px] sm:text-4xl font-medium text-mauve-800 text-shadow-sm dark:shadow-black/65">
          {portfolio.author}
        </h1>

        <Socials />
      </div>
    </div>
  );
}

async function Bio() {
  const contributions = await getGitHubContributions();

  return (
    <div className="relative pt-6 pb-8 px-4">
      <div className="space-y-4">
        {portfolio.bio.map((b, i) => (
          <p
            key={`${i + 1}`}
            className="text-sm text-neutral-600 leading-relaxed"
          >
            {b}
          </p>
        ))}

        <EmailInfo />
      </div>

      <GithubContributions contributions={contributions}>
        <CodingHours />
      </GithubContributions>
    </div>
  );
}

function EmailInfo() {
  return (
    <div className="group flex flex-wrap items-center gap-0.5 text-sm text-neutral-600 leading-relaxed">
      <span>pixels to my inbox:</span>
      <Link
        href={`mailto:${portfolio.mail}`}
        className="ml-0.5 text-mauve-800 font-medium underline decoration-mauve-300 group-hover:decoration-mauve-800 underline-offset-3 transition-colors ease-in-out"
      >
        soumya@deathstalker.dev
      </Link>
      <CopyButton
        variant="ghost"
        className="hidden can-hover:inline-flex opacity-0 group-hover:opacity-100 blur-px group-hover:blur-none"
        text={portfolio.mail}
      />
    </div>
  );
}
