import { useQuery } from "@tanstack/react-query";
import { useDappApi } from "./use-dapp-api";
import { queryKeys } from "@/shared/lib/query-keys";

export const useTotalValueLocked = () => {
  return useQuery({
    queryKey: queryKeys.tvl.totalValueLocked(),
    queryFn: async () => {
      const response = await useDappApi.api.getTotalValueLocked();
      return response;
    },
    staleTime: 0, // Data is always considered stale, will refetch on SSE events
  });
};

