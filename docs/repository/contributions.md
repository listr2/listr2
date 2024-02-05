---
title: Contributions
order: 10
---

# {{ $frontmatter.title }}

Contributions are very welcome in this repository. The repository is somewhat stable in the sense of how it works but it can always use some improvement in a highly evolving environment.

<!-- more -->

## Contributions Accepted

Contributions will be appreciated in bugs, feature requests, and supporting parts of the repository like tests, examples, documentation, `JSDocs`.

You can always open up a new issue for reporting the bugs and requesting features. Even you can even open up an issue for usage, where you are failing to do something due to the missing documentation.

**Please consider and give a try to implement your feature/bug-fix, most of them are immediately accepted and published as soon as possible.**

## Looking for Contributions

This section implies the following features or bug fixes are blocked for some reason or other and would be more than happy for any contributiors.

### Updating Renderer

Swapping updating renderer [`log-update`](https://www.npmjs.com/package/log-update) for another library where it can do partial updates.

#### Problems with Current Implementation

- For sufficiently long task lists, the flashing effect happens due to it updating the whole screen whenever [`ListrEventType.SHOULD_REFRESH_RENDER`](/api/listr2/enumerations/ListrEventType.html#should-refresh-render) is triggered by the parent task indicating a new render should be done.
- Most of the issues are opened about _Listr_ breaking or corrupting the terminal output. This sometimes causes unintended behavior.
- It brings a lot of overhead of wrapping and truncating the lines again inside the default renderer since the built-in one does not seem to work for our case.

#### What has been done?

There are a couple of tries have been made to migrate using the library [`stdout-update`](https://www.npmjs.com/package/stdout-update).

This has been mostly failed tries due to it behaving strangely on some tests.

Naturally, we do not expect it to be a one-to-one replacement, but some tests failed to generate any kind of output at all.

### Progress Bar

A progress bar can be used like the `task.progress()` inside a _Task_ and sets the progress to `100%` whenever the task finishes, can be a very good addition to the current architecture.

This can be rendered just after the task output, or the task title. I am not sure, which would be the best approach.

So we can kind of give users an `ETA` of something whenever there are long-running tasks.

## Preflight Checks

### Checklist for Contributions for Features and Feature Requests

- [x] Create an issue for a preliminary discussion or link the existing issue.
- [x] Read/Search existing issues and the provided documentation.
- [x] Provide the implementation, and a pull request whenever finalized.
- [x] Follow guidelines enforced by `git-hooks` of linting, tests, and commit convention, which is [Angular conventional commits](https://www.conventionalcommits.org/).
- [ ] Add tests whenever or if possible.
- [ ] Update the documentation.

**Much appreciated!**

### Checklist for Contributions for Bug Fixes

- [x] Link the existing issue.
- [x] Provide the implementation, and a pull request whenever finalized.
- [x] Follow guidelines enforced by `git-hooks` of linting, tests, and commit convention, which is [Angular conventional commits](https://www.conventionalcommits.org/).
- [ ] Add tests whenever or if possible.
- [ ] Update the documentation.

**Much appreciated!**

### Checklist for Opening an Issue for Feature Requests

- [x] Read/Search existing issues and the provided [documentation](https://listr2.kilic.dev).
- [x] Be sure to not open an issue in the [looking for contributions section](/repository/contributions.html#looking-for-contributions).
- [x] Describe what is missing from the current implementation, and how is it not achievable with whatever is provided.
- [x] Checking the latest version of the software to confirm it has not been added already.

### Checklist for Opening an Issue for Bug Fixes

- [x] Read/Search existing issues and the provided [documentation](https://listr2.kilic.dev).
- [x] Be sure to not open an issue in the [looking for contributions section](/repository/contributions.html#looking-for-contributions).
- [x] Describe your problem clearly.
- [x] Provide replication through snippets, repository or [replit](https://replit.com/) if possible.
- [x] Checking the latest version of the software to confirm it has not been fixed already.
