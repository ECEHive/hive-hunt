## Hive Hunt

Interactive outdoor clue hunt game built with Bun + React + Tailwind.

### Stack

- Bun runtime & bundler
- React 19 + Hooks
- Tailwind CSS 4
- shadcn-inspired UI primitives

### Getting Started

```bash
bun install
bun dev
```

Visit http://localhost:3000 (default bun serve port) after startup.

### Scripts

- dev – start development server with HMR
- build – production build to `dist/`
- start – run production server directly (serves from source HTML)
- typecheck – run TypeScript compiler in noEmit mode
- lint / lint:fix – ESLint with TypeScript, React, a11y, prettier integration
- format – Prettier formatting
- test – Bun test runner
- check – aggregate (typecheck + lint + tests)

### Environment Variables

Create a `.env` (see `.env.example`). Example:

```
VITE_PUBLIC_API_BASE=https://example.com
```

Access via `import.meta.env.VITE_PUBLIC_API_BASE` (public-prefixed). Private runtime secrets should be provided via deployment platform and never prefixed with VITE*PUBLIC*.

### Production Build

```bash
bun run build
```

Outputs optimized, minified assets to `dist/` with sourcemaps (linked). Serve the `dist` directory with any static file host / CDN.

### Deployment Notes

- Ensure Bun version >= specified in `package.json` engines.
- Set `NODE_ENV=production` for optimal React behavior.
- Consider adding HTTP security headers (Content-Security-Policy, etc.) at reverse proxy.
- For static hosting only, you can prerender and serve `dist/` contents; the included `serve` usage is optional.

### Quality & Tooling

- Strict TypeScript with additional safety flags.
- ESLint (TS, React, Hooks, a11y) + Prettier.
- Error boundary wraps the app to avoid white screens.
- Basic test scaffolding (extend as logic grows).

### Testing

Add tests under `tests/` or `src/**/__tests__`. Run:

```bash
bun test
```

### Contributing

1. Create feature branch
2. Run `bun run check`
3. Open PR – CI will run lint, typecheck, tests

### License

MIT (add LICENSE file if distributing publicly)

### Future Improvements

- Persist versioning / migrations for stored game state
- Add e2e tests (e.g. Playwright) for full flow
- Implement PWA manifest & offline caching
- Add analytics event pipeline (privacy-conscious)
