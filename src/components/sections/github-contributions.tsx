"use client";

import { format } from "date-fns";
import {
  type Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function GithubContributions({
  contributions,
  children,
}: {
  contributions: Array<Activity>;
  children: React.ReactNode;
}) {
  return (
    <ContributionGraph
      data={contributions}
      blockSize={8.72}
      blockMargin={3}
      className="mt-8 w-full"
    >
      <ContributionGraphCalendar className="no-scrollbar">
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                  className={cn(
                    'data-[level="0"]:fill-mauve-200',
                    'data-[level="1"]:fill-mauve-400',
                    'data-[level="2"]:fill-mauve-500',
                    'data-[level="3"]:fill-mauve-600',
                    'data-[level="4"]:fill-mauve-700',
                  )}
                />
              </g>
            </TooltipTrigger>

            <TooltipContent
              className="font-sans"
              sideOffset={0}
            >
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null} on{" "}
                {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="items-center justify-between">
        {children}
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <span className="text-muted-foreground text-xs">
              {totalCount.toLocaleString("en")} contributions <span className="hidden sm:inline">in {year}</span>
            </span>
          )}
        </ContributionGraphTotalCount>
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

function GithubContributionsFallback() {
  return (
    <div className="flex h-[120px] mt-8 w-full items-center justify-center">
      <div className="bg-muted size-full animate-pulse" />
    </div>
  );
}

export { GithubContributions, GithubContributionsFallback };
