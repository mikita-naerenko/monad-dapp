const throwEnvError = (key: string): never => {
  throw new Error(`Environment variable "${key}" is not defined`);
};

const ensureAbsoluteUrl = (value: string, key: string): URL => {
  try {
    return new URL(value);
  } catch (error) {
    throw new Error(
      `Environment variable "${key}" must be an absolute URL. Received "${value}".`,
      { cause: error }
    );
  }
};

const stripTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const FALLBACK_ORIGIN = "http://localhost:3000";

const env = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_SSE_URL: process.env.NEXT_PUBLIC_SSE_URL,
  NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL,
  NEXT_PUBLIC_BASE_CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS,
  NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL,
  NEXT_PUBLIC_BASE_SEPOLIA_CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_CONTRACT_ADDRESS,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
} as const;

type EnvKey = keyof typeof env;

const isProduction = () => process.env.NODE_ENV === "production";

const getApiUrlParts = () => {
  const raw = getOptionalEnvVar("NEXT_PUBLIC_API_BASE_URL");
  if (!raw) {
    return {
      origin: FALLBACK_ORIGIN,
      apiPrefix: "/api",
    };
  }

  const url = ensureAbsoluteUrl(raw, "NEXT_PUBLIC_API_BASE_URL");
  return {
    origin: url.origin,
    apiPrefix: stripTrailingSlash(url.pathname) || "",
  };
};

const getChainRpcKey = (): EnvKey =>
  isProduction()
    ? "NEXT_PUBLIC_BASE_RPC_URL"
    : "NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL";

const getChainRpcFallback = () =>
  isProduction() ? "https://mainnet.base.org" : "https://sepolia.base.org";

const getContractKey = (): EnvKey =>
  isProduction()
    ? "NEXT_PUBLIC_BASE_CONTRACT_ADDRESS"
    : "NEXT_PUBLIC_BASE_SEPOLIA_CONTRACT_ADDRESS";

export const getEnvVar = (key: EnvKey): string => {
  const value = env[key];
  if (!value) {
    return throwEnvError(key);
  }

  return value;
};

export const getOptionalEnvVar = (key: EnvKey): string | undefined => {
  const value = env[key];
  return value?.trim() ? value : undefined;
};

export const getApiOrigin = (): string => getApiUrlParts().origin;

export const getApiBasePath = (): string => getApiUrlParts().apiPrefix;

export const getApiBaseUrl = (): string => {
  const { origin, apiPrefix } = getApiUrlParts();
  return `${origin}${apiPrefix}`;
};

export const getSseUrl = (): string => {
  const custom = getOptionalEnvVar("NEXT_PUBLIC_SSE_URL");
  if (custom) {
    return stripTrailingSlash(
      ensureAbsoluteUrl(custom, "NEXT_PUBLIC_SSE_URL").toString()
    );
  }

  return `${getApiOrigin()}/events`;
};

export const getRpcUrl = (): string =>
  getOptionalEnvVar(getChainRpcKey()) ?? getChainRpcFallback();

export const getMinerContractAddress = (): string =>
  getEnvVar(getContractKey());

export const getWalletConnectProjectId = (): string =>
  getEnvVar("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
