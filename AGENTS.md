# listr2

Terminal task list library for Node.js. This pnpm monorepo publishes `listr2` and three packages that depend on it.

## Layout

- `packages/listr2`: the library.
  - `src/listr.ts` and `src/lib/` hold the task model (`Listr`, `Task`, `TaskWrapper`).
  - `src/renderer/` holds the renderers: default, simple, verbose, test and silent.
  - `src/utils/process-output/` captures stdout/stderr and owns the terminal while the default renderer draws: log-update, the `stty -echo` input lock, resize, Ctrl+Z.
  - `tests/` holds the unit and e2e specs, and `tests/utils/` the shared helpers (a headless xterm `VirtualTerminal`, `FakeStty`, mocks).
- `packages/manager`, `packages/prompt-adapter-enquirer`, `packages/prompt-adapter-inquirer` depend on `listr2` through workspace links.
- `examples/` holds runnable examples, plus `examples/screenshots/` for the documentation images, stored in Git LFS.
- `docs/` is the VitePress site. Its sidebar is generated from frontmatter `order`, and migration notes live in `docs/migration/v<major>.md`.

## Commands

Run these from the repository root, on the Node.js version in `.nvmrc` with pnpm.

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm run lint:ci
pnpm -r --workspace-concurrency=1 run typecheck
pnpm -r --workspace-concurrency=1 run test
pnpm run docs:build
pnpm --filter @listr2/examples start examples/<file>.ts
```

- **Build first:** the other packages resolve `listr2` through its `dist/`, so their typecheck and tests, and the docs, fail in a fresh clone until `pnpm build` ran. `pnpm run dev:start` builds once and then starts the watchers and the docs server.
- **Run checks one package at a time:** run test and typecheck with `--workspace-concurrency=1`. The parallel root scripts can run out of memory on small machines.
- **Single package:** to test one package, run `pnpm --filter listr2 test`, and add `-u` to update its snapshots. Don't write `-- -u`: pnpm passes the `--` on to vitest, which then ignores `-u`.
- **Examples run from source:** they use tsx, so `pnpm build` is not needed before running them.

## Code Style

- TypeScript ESM. Inside `listr2`, import through the `#…` subpath imports declared in its `package.json` (`#lib`, `#utils`, `#renderer`, …), not through relative paths across modules.
- Interfaces and types go in `*.interface.ts`, and constants in `*.constants.ts`, next to the code that uses them.
- Match the surrounding code. Write a comment only to explain a non-obvious why.
- Avoid one-use abstractions, defensive checks for impossible states, `||=` chains, and long one-line condition chains.
- Formatting comes from prettier and `@cenk1cenk2/eslint-config`. `pnpm run format` in a package fixes both.
- Public options and log levels carry TSDoc with `@defaultValue`, plus `@see` links to the docs where a page exists.

## Tests

- Vitest, with each package's config in `tests/vitest.config.ts`.
- Test through the public interface: run a `Listr`, and assert on the output, the screen or the scrollback. Don't assert on private members or call order.
- Default renderer output is asserted on a headless xterm (`VirtualTerminal`) screen and scrollback. Check the raw writes only for what the screen cannot show, such as escape sequences or trailing spaces.
- Keep helpers inside the `describe` that uses them, or in `tests/utils` when several files share them.
- Restore spies and mocks in hooks, not in test bodies.
- Snapshot names come from the test name, plus a short hint such as `toMatchSnapshot('screen')`; don't pass generated IDs.

## Documentation

- Every behavior or option change updates `docs/` and its TSDoc in the same change. Every breaking change gets an entry in the matching `docs/migration/v<major>.md`.
- Docs that describe terminal output also show a screenshot from a real terminal. Add a case to `examples/renderer-cases.example.ts` and capture it as `examples/screenshots/README.md` describes. Never use ANSI rendered to HTML.
- Don't put anything in the docs that goes stale: no commit SHAs, test counts, line numbers, dependency major versions, or dates.

## Commits and Releases

- Conventional commits (commitizen, `git cz`). `feat`, `fix` and `perf` release. `!` or a `BREAKING CHANGE:` footer releases a major.
- Keep tool trailers such as `Co-authored-by` or `Amp-Thread-ID` out of the `BREAKING CHANGE` paragraph, since the changelog copies that paragraph.
- Releases run from CI on `master` and on the branches `next`, `next-major`, `alpha`, `beta` and `rc`, through multi-semantic-release (`.multi-releaserc.json`).
  - Each package gets its own release commit, and `lockfile: true` refreshes `pnpm-lock.yaml` in it.
  - npm publishes are staged and need the maintainer's approval.
- Don't edit `CHANGELOG.md` or package versions by hand; the release does that.
