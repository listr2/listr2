---
title: Examples
order: 15
---

# {{ $frontmatter.title }}

`listr2` boasts many examples in the repository where you can dive deeper into the usage of the application, whenever the documentation is insufficient for advanced cases.

<!-- more -->

## Examples

Examples live in the folder [`./examples/`](https://github.com/listr2/listr2/tree/master/examples), and they can be run on your environment since they are all working examples.

The documentation also includes many examples, these examples are also working examples that can be run/inspected in the folder [`./examples/docs/`](https://github.com/listr2/listr2/tree/master/examples/docs).

If you ever choose to clone the repository, you can run all the examples through `ts-node` in your local environment, to learn about or test new things out.

```bash
# clone the repository
git clone git@github.com:cenk1cenk2/listr2.git

# install the dependencies
pnpm install

# build packages
pnpm build

# run any example, by giving the script a relative path in the repository
pnpm run --filter examples start examples/renderer-default.example.ts
```

## `jsdoc`

For every exposed option mostly includes a brief explanation, if it is missing in the examples.

## Tests

In the cases where the examples might not be enough, you can always dive deeper into the tests folder that lives in the folder [`./tests/`](https://github.com/listr2/listr2/tree/master/tests). This application is mostly well-tested for edge conditions, however, it is limited to being a primarily terminal application. Unfortunately, since the terminal is mocked while testing you cannot directly see your changes on the tests, but you can always dive deeper into the examples given there.
