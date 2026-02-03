/**
 * Query keys for TanStack Query
 * Centralized location for all query keys used in the application
 */

export const queryKeys = {
  tvl: {
    chart: (params?: unknown) => ["tvl-chart", params] as const,
    totalValueLocked: () => ["total-value-locked"] as const,
  },
  user: {
    leaderboard: (params?: unknown) => ["user-leaderboard", params] as const,
    referrals: (params?: unknown) => ["user-referrals", params] as const,
    weeklyRanking: (params?: unknown) =>
      ["user-weekly-ranking", params] as const,
  },
  weeklyCompound: {
    ranking: (params?: unknown) =>
      ["weekly-compound-ranking", params] as const,
  },
} as const;

