# Contributing

Thanks for helping improve `@varienos/device-detector-js`! Whether you are reporting a bug, suggesting an improvement, or submitting code, these guidelines will keep things smooth and predictable.

## Before You Start

- Review the [Code of Conduct](CODE_OF_CONDUCT.md); respectful, inclusive communication is expected from everyone.
- Search existing [issues](https://github.com/varienos/device-detector-js/issues) and discussions to avoid duplicates.
- For sensitive security reports, follow the [Security Policy](SECURITY.md) instead of filing a public issue.

## Development Setup

```bash
npm install
```

| Task | Command | Notes |
| --- | --- | --- |
| Lint | `npm run lint` | Use `npm run lint:fix` for auto-fixes where safe |
| Unit tests | `npm test -- --watchman=false` | The extra flag avoids macOS Watchman sandbox warnings |
| Watch tests | `npm run test:watch` | Ideal during iterative development |
| Build bundle | `npm run build` | Produces `dist/device-detector.min.js` + source map |
| Dev server | `npm run dev` | Serves `examples/` for manual smoke tests |

## Branching & Commits

1. Create a topic branch from `main` (for example, `git checkout -b fix/tablet-detection`).
2. Keep commits focused. Use imperative, sentence-case messages that describe the behavior change (e.g. `fix: handle ipad user agent edge cases`).
3. If your work alters public APIs or the bundle, include context in the commit body or PR description.

## Testing Expectations

- Add or update Jest specs under `test/` mirroring the structure in `src/`.
- Cover both positive and negative user-agent samples when expanding detection logic.
- Ensure `npm test -- --watchman=false` and `npm run lint` succeed before submitting a PR.

## Pull Requests

When opening a PR:

- Complete the pull request template checklist.
- Reference related issues (e.g. `Closes #123`).
- Describe manual validation done via `npm run dev` if relevant.
- Attach screenshots or logs when UI samples in `examples/` change.
- Request review once CI (if configured) is green.

## Releases

Maintainers follow [Semantic Versioning](https://semver.org/).

- Patch (`x.y.z+1`): backward-compatible fixes and internal hardening.
- Minor (`x.y+1.0`): backward-compatible features or notable improvements.
- Major (`x+1.0.0`): breaking API or behavioral changes.

Publishing steps:

1. Update version via `npm version <patch|minor|major> --no-git-tag-version`.
2. Regenerate the bundle (`npm run build`).
3. Run tests and lint checks.
4. Commit, tag, and push (including tags).
5. Run `npm publish` from a clean workspace.

Thanks again for contributing!
