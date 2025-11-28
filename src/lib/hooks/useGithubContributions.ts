import { Activity } from "@/components/kibo-ui/contribution-graph";
import { useQuery } from "@tanstack/react-query";
import { getGitHubContributions } from "@/lib/actions/github-contributions";

export function useGithubContributions() {
  return useQuery<Array<Activity>>({
    queryKey: ["github-contributions"],
    queryFn: getGitHubContributions,
  });
}
