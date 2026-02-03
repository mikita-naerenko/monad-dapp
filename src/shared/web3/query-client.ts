import { QueryClient } from "@tanstack/react-query";
import type { Persister } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { deserialize, serialize } from "wagmi";

const DAY_IN_MS = 86_400_000;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: DAY_IN_MS,
      },
    },
  });

export const createQueryPersister = (): Persister | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
  });
};
