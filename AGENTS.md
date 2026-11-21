# listr2

Terminal task list library for Node.js. This pnpm monorepo publishes `listr2` and the packages under `packages/` that build on it.

## Structure

- `packages/listr2` is the library. Its entry is `src/index.ts`, and its modules import each other through the `#…` subpath imports declared in its `package.json`, which point at `src/`.
  - `src/listr.ts` and `src/lib/` hold the task model: a `Listr` owns its `Task`s, and a task that returns `task.newListr()` gets a child `Listr` that shares the parent's events and abort signal.
  - `src/renderer/` holds the integrated renderers. `Listr` picks one through `getRenderer()` in `src/utils/ui/renderer.ts`, calls its static `assertOptions` when a list or a task is created, and drives it through task events.
  - `src/utils/process-output/` owns stdout and stderr while a renderer draws. The renderers reach it through `ListrLogger`.
- The other packages under `packages/` depend on `listr2` through a version range that `linkWorkspacePackages` in `pnpm-workspace.yaml` links to the local package. The link resolves to its built `dist/`, not its `src/`.
- `examples/` holds runnable examples that import the libraries from source through tsx. `examples/screenshots/` holds the documentation images, stored in Git LFS, and the way to capture them.
- `docs/` is the VitePress site. Its sidebar is generated from the frontmatter `order` of each page.

## Commands

Run these from the repository root, on the Node.js version in `.nvmrc`.

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm run lint:ci
pnpm -r --workspace-concurrency=1 run typecheck
pnpm -r --workspace-concurrency=1 run test
pnpm run docs:build
pnpm --filter @listr2/examples start examples/<file>.ts
```

- Run `pnpm build` before the typecheck, tests or docs of anything but `listr2`, since they read `listr2` from its `dist/`.
- Run typecheck and tests one package at a time. The parallel root scripts can run out of memory on small machines.
- To update the snapshots of one package, run `pnpm --filter listr2 test -u`. With `-- -u`, pnpm passes the `--` on to vitest, which then ignores `-u`.

## Releases

CI releases from `master` and from the prerelease branches that `@cenk1cenk2/semantic-release-config` names, through multi-semantic-release configured in `.multi-releaserc.json` and each package's `release.config.js`. Each package gets its own release commit, which also refreshes `pnpm-lock.yaml`. The npm publishes are staged and wait for the maintainer's approval.
