import { useQuery } from "@tanstack/react-query";
import { getChartData } from "./index";
import { queryKeys } from "@/shared/lib/query-keys";
import type { ApiControllerGetTvlChartData } from "@/shared/api/client";

/**
 * Get tomorrow's date at 00:00:00 to ensure we always get all data up to end of today
 * This provides a stable 'to' parameter that doesn't change during the day
 */
const getTomorrowStart = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
};

export const useTvlChart = (params?: ApiControllerGetTvlChartData) => {
  return useQuery({
    queryKey: queryKeys.tvl.chart(params),
    queryFn: async () => {
      // Always use tomorrow's date (00:00:00) for 'to' parameter
      // This ensures we get all data up to end of today and provides stable caching
      const requestParams: ApiControllerGetTvlChartData = params
        ? {
            ...params,
            to: getTomorrowStart(), // Tomorrow at 00:00:00
          }
        : { to: getTomorrowStart() };
      const response = await getChartData(requestParams);
      return response;
    },
    staleTime: 0, // Data is always considered stale, will refetch on SSE events
    // refetchInterval removed - data updates via SSE
  });
};
