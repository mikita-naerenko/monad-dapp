"use client";

import { useEffect, useMemo } from "react";

import {
  OpenAPI,
  type OpenAPIConfig,
  apiControllerGetLeaderboard,
  apiControllerGetTvlChart,
  apiControllerGetTotalValueLocked,
  apiControllerGetUserLeaderboardData,
  apiControllerGetUserReferrals,
  sseGatewayStream,
} from "@/shared/api/client";
import { getApiOrigin, getSseUrl } from "@/shared/config/env";

// Initialize OpenAPI configuration at module level
if (typeof window !== "undefined") {
  OpenAPI.BASE = getApiOrigin();
  OpenAPI.WITH_CREDENTIALS = true;
  OpenAPI.CREDENTIALS = "include";
}

type UseDappApiOptions = Partial<
  Pick<OpenAPIConfig, "BASE" | "WITH_CREDENTIALS" | "CREDENTIALS" | "TOKEN">
> & {
  readonly eventsUrl?: string;
};

// Static API object for direct access
export const useDappApi = {
  api: {
    getLeaderboard: apiControllerGetLeaderboard,
    getUserLeaderboard: apiControllerGetUserLeaderboardData,
    getUserReferrals: apiControllerGetUserReferrals,
    getTvlChart: apiControllerGetTvlChart,
    getTotalValueLocked: apiControllerGetTotalValueLocked,
    streamEvents: sseGatewayStream,
  },
  get eventsUrl() {
    return getSseUrl();
  },
};

// Hook for dynamic configuration (optional, for cases where you need to override settings)
export const useDappApiConfig = (options: UseDappApiOptions = {}) => {
  const resolvedConfig = useMemo(
    () => ({
      BASE: options.BASE ?? getApiOrigin(),
      WITH_CREDENTIALS: options.WITH_CREDENTIALS ?? true,
      CREDENTIALS: options.CREDENTIALS ?? "include",
      TOKEN: options.TOKEN,
    }),
    [options.BASE, options.CREDENTIALS, options.TOKEN, options.WITH_CREDENTIALS]
  );

  useEffect(() => {
    OpenAPI.BASE = resolvedConfig.BASE;
    OpenAPI.WITH_CREDENTIALS = resolvedConfig.WITH_CREDENTIALS;
    OpenAPI.CREDENTIALS = resolvedConfig.CREDENTIALS;
    OpenAPI.TOKEN = resolvedConfig.TOKEN;
  }, [resolvedConfig]);

  const eventsUrl = useMemo(
    () => options.eventsUrl ?? getSseUrl(),
    [options.eventsUrl]
  );

  return useMemo(
    () => ({
      api: useDappApi.api,
      eventsUrl,
    }),
    [eventsUrl]
  );
};
