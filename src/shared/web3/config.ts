import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, createStorage } from "wagmi";
import type { Chain } from "wagmi/chains";

import { getRpcUrl, getWalletConnectProjectId } from "@/shared/config/env";

import { getSupportedChains } from "./chains";

export const createWagmiConfig = () => {
  const chains = getSupportedChains();

  if (chains.length === 0) {
    throw new Error("No chains configured for wagmi.");
  }

  const wagmiChains = chains as [Chain, ...Chain[]];
  const transports = wagmiChains.reduce(
    (acc, chain) => ({
      ...acc,
      [chain.id]: http(getRpcUrl()),
    }),
    {} as Record<(typeof wagmiChains)[number]["id"], ReturnType<typeof http>>
  );

  return getDefaultConfig({
    appName: "Miner Front",
    projectId: getWalletConnectProjectId(),
    chains: wagmiChains,
    transports,
    ssr: true,
    storage: createStorage({
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    }),
  });
};

let wagmiConfigInstance: ReturnType<typeof createWagmiConfig> | null = null;

export const getWagmiConfig = () => {
  if (!wagmiConfigInstance) {
    wagmiConfigInstance = createWagmiConfig();
  }
  return wagmiConfigInstance;
};

export const wagmiConfig = getWagmiConfig();
