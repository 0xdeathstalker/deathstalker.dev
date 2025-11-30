import { Line } from "@/components/ui/line";
import { getGitHubContributions } from "@/lib/actions/github-contributions";
import { portfolio } from "@/lib/config/site-data";
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
    <div className="relative py-4 px-4 max-[690px]:px-8">
      <Line
        orientation="horizontal"
        position="top"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 sm:justify-between">
        <h1 className="text-4xl font-medium text-shadow-sm dark:shadow-black/65">{portfolio.author}</h1>

        <Socials />
      </div>
    </div>
  );
}

async function Bio() {
  const contributions = await getGitHubContributions();

  return (
    <div className="relative pt-6 pb-8 px-4 max-[690px]:px-8 ">
      <Line
        orientation="horizontal"
        position="bottom"
        variant="contained"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
        className="max-w-[650px]"
      />

      <div className="space-y-4">
        {portfolio.bio.map((b, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={i}
            className="text-[#272727] leading-relaxed"
          >
            {b}
          </p>
        ))}
      </div>

      <GithubContributions contributions={contributions} />
    </div>
  );
}
