# @univerjs/presets

[![npm version](https://img.shields.io/npm/v/@univerjs/presets?style=flat-square)](https://npmjs.com/package/@univerjs/presets)
[![license](https://img.shields.io/npm/l/@univerjs/presets?style=flat-square)](https://npmjs.com/package/@univerjs/presets)
[![downloads](https://img.shields.io/npm/dm/@univerjs/presets?style=flat-square)](https://npmjs.com/package/@univerjs/presets)

`@univerjs/presets` Build Univer apps faster and easier with pre-configured plugin collections.

## Package Overview

| Package             | UMD global     | CSS | Locales | Facade entry |
| ------------------- | -------------- | :-: | :-----: | :----------: |
| `@univerjs/presets` | `createUniver` | No  |   No    |     Yes      |

## Installation

```sh
pnpm add @univerjs/presets
# or
npm install @univerjs/presets
```

Keep all `@univerjs/*` and `@univerjs-pro/*` packages on the same version.

## Usage

```ts
import { createUniver, UniverSheetsCorePreset } from '@univerjs/presets';

const { univer, univerAPI } = createUniver({
    presets: [UniverSheetsCorePreset()],
});
```

## Resources

- [Documentation](https://docs.univer.ai)
- [NPM package](https://npmjs.com/package/@univerjs/presets)
- [GitHub repository](https://github.com/dream-num/univer)
