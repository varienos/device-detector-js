# Repository Guidelines

## Project Structure & Module Organization
The core library lives in `src/device-detector.js`, exported as both ES module and UMD for browser builds. Bundled assets are written to `dist/device-detector.min.js` by the build pipeline, and TypeScript consumers rely on the declarations in `types/device-detector.d.ts`. Tests reside in `test/device-detector.test.js`, mirroring the source structure with a `*.test.js` suffix. Use `docs/api.md` for reference updates and `examples/` to stage manual validation scenarios served by the dev server.

## Build, Test, and Development Commands
- `npm run build`: Minifies the library with Terser and refreshes `dist/device-detector.min.js` and its source map.
- `npm run dev`: Launches `http-server` against `examples/` and opens the browser for smoke testing against real user agents.
- `npm test`: Executes the Jest suite once in the configured `jsdom` environment.
- `npm run test:watch`: Re-runs Jest on file changes; keep it running while iterating on detection logic.
- `npm run lint` / `npm run lint:fix`: Checks formatting with ESLint and optionally auto-fixes stylistic issues.

## Coding Style & Naming Conventions
Follow the established 2-space indentation, semicolons, and single quotes visible in `src/device-detector.js`. Export classes with PascalCase (`DeviceDetector`) and instance helpers with camelCase (`deviceDetector`). Document public methods with JSDoc to keep generated typings accurate, and rely on ESLint defaults before introducing new rules.

## Testing Guidelines
Jest runs with `testEnvironment: "jsdom"`, so mock browser globals sparingly and prefer integration-like assertions on the class API. Place new specs in `test/` alongside related features using the `*.test.js` naming convention. Jest already collects coverage from `src/**/*.js`; maintain or improve coverage when adding detection branches and capture negative cases for new user-agent patterns.

## Commit & Pull Request Guidelines
Commit messages follow concise, sentence-style imperatives (see `Remove Project Structure section from README`). Reference the surface area changed and avoid bundling unrelated refactors. Pull requests should link relevant issues, summarize behavioral impact, note any manual UA scenarios exercised via `npm run dev`, and confirm lint/tests ran locally. Include screenshots or console output when the change affects example demos or build artifacts.

## Detection Strategy Notes
- Prefer `navigator.userAgentData` hints when available, then fall back to the existing user-agent regex helpers; guard access so Node-based builds stay safe.
- Keep `isWindowsPhone()` wired for backwards compatibility but treat it as deprecated in new work and document any usage in PR notes.
