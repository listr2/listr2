---
home: true
icon: home
title: listr2
heroText: listr2
tagline: Create beautiful CLI interfaces via easy and logical-to-implement task lists that feel alive and interactive.
actions:
  - text: Start building!
    link: /listr/installation.html
    type: primary
  - text: Read the foreword.
    link: /repository/foreword.html
    type: primary
  - text: Github
    icon: simple-icons:github
    link: https://github.com/cenk1cenk2/listr2
  - text: NPM
    icon: simple-icons:npm
    link: https://www.npmjs.com/package/listr2
showcases:
  - name: lint-staged
    href: test

copyright: false
---

::: center

[![Pipeline](https://gitlab.kilic.dev/libraries/listr2/badges/master/pipeline.svg?style=flat-square&ignore_skipped=true)](https://gitlab.kilic.dev/libraries/listr2/-/commits/master) [![Version](https://img.shields.io/npm/v/listr2.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/listr2?activeTab=versions) [![Downloads](https://img.shields.io/npm/dm/listr2.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/listr2) [![Size](https://img.shields.io/bundlephobia/min/listr2?style=flat-square&logo=npm)](https://www.npmjs.com/package/listr2) [![Dependencies](https://img.shields.io/librariesio/release/npm/listr2?style=flat-square&logo=npm)](https://www.npmjs.com/package/listr2?activeTab=dependencies) [![codecov](https://codecov.io/gh/cenk1cenk2/listr2/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/cenk1cenk2/listr2)

[![github sponsors](https://img.shields.io/github/sponsors/cenk1cenk2?label=github%20sponsors&style=flat-square&logo=github)](https://github.com/sponsors/cenk1cenk2) [![opencollective](https://img.shields.io/opencollective/sponsors/listr2?label=open%20collective&logo=opencollective)](https://opencollective.com/listr2) <a class="github-button" href="https://github.com/listr2/listr2" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star listr2/listr2 on GitHub">Star</a>

This is the expanded and re-written Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr).

![demo](../examples/renderer-default.gif)

### Showcase

<span v-for="showcase in showcases">
  <a :href="'https://www.npmjs.com/package/' + showcase" target="_blank" style="padding: 8px;"><Badge type="warning" vertical="middle">{{ showcase }}</Badge></a>
</span>

:::

<script setup>
import 'https://buttons.github.io/buttons.js'

let showcases = [
  "lint-staged",
  "cypress",
  "@electron-forge/shared-types",
  "@graphql-codegen/cli",
  "contentful-migration",
  "@electron-forge/core",
  "@redwoodjs/cli-helpers"
]
</script>
