import { useQuery } from "@tanstack/react-query";
import type { CodingTime } from "@/lib/types";

function useCodingHours() {
  return useQuery<CodingTime>({
    queryKey: ["coding-hours"],
    queryFn: async () => {
      const response = await fetch("/api/coding-hours");
      if (!response.ok) {
        throw new Error("Failed to fetch coding hours");
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export { useCodingHours };
