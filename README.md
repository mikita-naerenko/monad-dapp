## Monad DApp

Next.js 16 application structured with the Feature-Sliced Design (FSD) methodology for a modular dashboard. The stack is centered around Mantine for UI primitives, Wagmi and RainbowKit for EVM wallet connectivity, `axios` for HTTP, and automatic OpenAPI type generation.

### Tech

- `Next.js 16` with the App Router
- `Mantine 7` (`core`, `hooks`, `modals`, `notifications`, `charts`)
- `wagmi` + `@rainbow-me/rainbowkit` + `viem` for web3 connectivity
- `@tanstack/react-query` for async caching
- `axios` as the shared HTTP client
- `@hey-api/openapi-ts` for client generation from OpenAPI specs

### Project Structure (FSD)

- `src/app` – Next.js routing, providers, and global styles
- `src/pages` – page-level models (no UI)
- `src/widgets` – composition-ready blocks (UI to be added later)
- `src/features` – reusable actions and interactions
- `src/entities` – domain models and helpers
- `src/shared` – cross-cutting concerns: config, API, web3 utilities

### Scripts

```bash
npm run dev          # start development server on http://localhost:3005
npm run build        # create production build
npm run start        # run production build
npm run lint         # run eslint
npm run generate:api # generate REST client from OpenAPI spec
```

### OpenAPI Workflow

Place the upstream OpenAPI schema into `src/shared/api/openapi/index.json` (the file is intentionally empty in the template). Then run:

```bash
npm run generate:api
```

The generated client will be written to `src/shared/api/client` and can be imported through `@/shared/api`.

The dev server listens on port `3005`.

### Environment

Create `.env.local` with the following defaults:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/
# NEXT_PUBLIC_SSE_URL=http://localhost:3000/events   # optional override
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_BASE_SEPOLIA_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

`NEXT_PUBLIC_API_BASE_URL` is normalised to the origin (`http://localhost:3000`) для REST-ручек из OpenAPI (`/api/*`). SSE по умолчанию использует `http://localhost:3000/events`; при необходимости можно явно задать `NEXT_PUBLIC_SSE_URL`.

Wagmi автоматически выбирает сеть в зависимости от `NODE_ENV`: в режиме разработки подключается `baseSepolia`, в продакшене — `base`. Для каждой сети нужны свои RPC-узлы и адреса контракта (`NEXT_PUBLIC_BASE*_RPC_URL`, `NEXT_PUBLIC_BASE*_CONTRACT_ADDRESS`).
