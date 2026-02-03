"use client";

import { PropsWithChildren, useState } from "react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { appTheme } from "@/shared/config/theme";
import {
  createQueryClient,
  createQueryPersister,
  wagmiConfig,
  rainbowKitConfig,
} from "@/shared/web3";
import { useSSEStream } from "@/shared/api/hooks/use-sse-stream";

const SSEConnection = () => {
  useSSEStream({
    enabled: true,
    onError: (error) => {
      console.error("SSE connection error:", error);
    },
  });
  return null;
};

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => createQueryClient());
  const [persister] = useState(() => createQueryPersister());

  const tree = (
    <RainbowKitProvider {...rainbowKitConfig}>
      <MantineProvider theme={appTheme} defaultColorScheme="auto">
        <ModalsProvider>
          <SSEConnection />
          <Notifications
            zIndex={1}
            style={{
              position: "fixed",
              top: "70px",
              right: "20px",
              zIndex: 1,
            }}
          />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </RainbowKitProvider>
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      {persister ? (
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          {tree}
        </PersistQueryClientProvider>
      ) : (
        <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider>
      )}
    </WagmiProvider>
  );
};
