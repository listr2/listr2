---
title: Release
order: 20
next: false
---

# {{ $frontmatter.title }}

This library uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and [renovate](https://github.com/renovatebot/renovate) for dependency updates.

<!-- more -->

## Semantic Versioning

`listr2` follows the strict publishing guidelines with [semantic-versioning](https://semver.org/).

This is enforced through [commitizen](https://github.com/commitizen/cz-cli) and [Angular conventional commits](https://www.conventionalcommits.org/).

We are utilizing the default preset to publish a new version. Whenever you want to do a contribution, you should also follow it to ensure a proper version has been published, but no worries I will usually double-check this.

**You can be sure that no breaking change will be published in a non-major version, but if something is not already working as intended it can have a patch with minor breaking changes.**

Commits are usually scoped to the changes being done, so even though it is a huge change it can be committed as smaller chunks to show the flow.

## Updates

`listr2` employs automated updates to all dependencies utilizing [renovate](https://github.com/renovatebot/renovate).

After migrating `ts-node`, `jest`, `ts-jest` to `esm` as well in the repository itself, there is nothing holding us back to use the latest versions of the dependencies.

- A new version will be published whenever a production dependency is updated.
- Major dependencies require accepting the pull requests manually.
- Every CI rule that this repository employs will run before updating any dependency. So if something fails the tests, it will not be merged in. Till now it has never been an instance where garbage/unworking code has been published with this methodology, so it is not much of a wory.
- This is running on my Gitlab instance, so you can not directly see the changes/requests in Github. It can only be inspected further through the public pipelines or changelog after the fact.

## Hooks

A set of `git-hooks` are inplace to ensure consistency.

- `lint-staged` runs with the linting configuration for each commit, to ensure the styling of the code is consistent.
- `commitizen` runs with `@cenk1cenk2/cz-cc` preset for each commit, to ensure the commits are in conventional-commits format.
- `pnpm run test` run before pushing back to the repository.
