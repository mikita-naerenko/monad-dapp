import { QueryClient } from "@tanstack/react-query";
import type { EventPayload } from "@/shared/api/client";

type SSEEventType = "user:update" | "tvl:update" | "weekly-compound:update";

interface SSEEventHandlerOptions {
  queryClient: QueryClient;
}

/**
 * Handles SSE events and updates TanStack Query cache accordingly
 */
export const handleSSEEvent = (
  event: EventPayload,
  options: SSEEventHandlerOptions
): void => {
  const { queryClient } = options;
  const eventType = event.type as SSEEventType;

  const refetchQueries = (queryKey: readonly unknown[]) => {
    console.log(
      `[SSE] Refetching queries with key: ${JSON.stringify(queryKey)}`
    );
    // Use refetchQueries to explicitly trigger refetch, ignoring staleTime
    queryClient.refetchQueries({
      queryKey,
      type: "active", // Only refetch active queries (mounted components)
    });
  };

  switch (eventType) {
    case "tvl:update": {
      // Refetch all TVL chart queries to get fresh data
      // Using prefix to refetch all queries starting with "tvl-chart"
      refetchQueries(["tvl-chart"]);
      // Also refetch total value locked
      refetchQueries(["total-value-locked"]);
      break;
    }

    case "user:update": {
      // Refetch user-related queries
      // Using prefixes to refetch all queries starting with these keys
      refetchQueries(["user-leaderboard"]);
      refetchQueries(["user-referrals"]);
      refetchQueries(["user-weekly-ranking"]);
      break;
    }

    case "weekly-compound:update": {
      // Refetch weekly compound ranking queries
      refetchQueries(["weekly-compound-ranking"]);
      break;
    }

    default:
      // Unknown event type, log for debugging
      console.warn(`Unknown SSE event type: ${eventType}`, event);
      break;
  }
};
