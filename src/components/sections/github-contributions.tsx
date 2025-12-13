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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function GithubContributions({
  contributions,
}: {
  contributions: Array<Activity>;
}) {
  return (
    <ContributionGraph
      data={contributions}
      blockSize={8}
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
                    'data-[level="0"]:fill-[#efefef]',
                    'data-[level="1"]:fill-[#adb5bd]',
                    'data-[level="2"]:fill-[#6c757d]',
                    'data-[level="3"]:fill-[#495057]',
                    'data-[level="4"]:fill-[#343a40]'
                  )}
                />
              </g>
            </TooltipTrigger>

            <TooltipContent className="font-sans" sideOffset={0}>
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground text-xs">
              {totalCount.toLocaleString("en")} contributions in {year}
            </div>
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
