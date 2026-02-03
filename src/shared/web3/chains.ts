import { base, baseSepolia, type Chain } from "wagmi/chains";

const isProduction = () => process.env.NODE_ENV === "production";

export const getSupportedChains = (): readonly [Chain, ...Chain[]] => {
  const activeChain = isProduction() ? base : baseSepolia;
  return [activeChain];
};

export const getPrimaryChain = (): Chain => getSupportedChains()[0];
