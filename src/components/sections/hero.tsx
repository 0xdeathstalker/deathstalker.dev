import { TextFlip } from "@/components/text-flip";
import { CornerBorder } from "@/components/ui/corner-border";
import { Line } from "@/components/ui/line";
import { getGitHubContributions } from "@/lib/actions/github-contributions";
import { portfolio } from "@/lib/config/site-data";
import { CodingHours } from "./coding-hours";
import { GithubContributions } from "./github-contributions";
import { SocialLargeButtons } from "./socials";

export async function Hero() {
  const contributions = await getGitHubContributions();

  return (
    <section id="hero">
      <Title />

      <Bio />

      <div className="relative pt-5.5 pb-6 px-4">
        <GithubContributions contributions={contributions}>
          <CodingHours />
        </GithubContributions>

        <Line
          orientation="horizontal"
          position="bottom"
          color="text-mauve-500/65"
          variant="contained"
        />
      </div>

      <SocialLargeButtons />
    </section>
  );
}

function Title() {
  return (
    <div className="relative p-4">
      <CornerBorder />

      <Line
        orientation="horizontal"
        position="top"
        color="text-mauve-500/65"
      />

      <div className="flex flex-col items-start">
        <h1 className="font-pixel-square leading-tight tracking-tight sm:tracking-normal text-4xl font-semibold text-mauve-700">
          {portfolio.author}
        </h1>

        <TextFlip>
          <span className="text-mauve-500">frontend engineer</span>
          <span className="text-mauve-500">design engineer</span>
          <span className="text-mauve-500">web3 developer</span>
        </TextFlip>
      </div>

      <Line
        orientation="horizontal"
        position="bottom"
        color="text-mauve-500/65"
      />
    </div>
  );
}

function Bio() {
  return (
    <div className="relative py-6 px-4">
      <div className="space-y-4">
        {portfolio.bio.map((b, i) => (
          <p
            key={`${i + 1}`}
            className="text-sm text-taupe-700 leading-relaxed"
          >
            {b}
          </p>
        ))}
      </div>

      <Line
        orientation="horizontal"
        position="bottom"
        color="text-mauve-500/65"
        variant="contained"
      />
    </div>
  );
}
