# qpind

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![License][license-src]][license-href]

Install dependecies quick & programmatically 📦

## Install

Using pnpm:

```sh
pnpm add qpind
```

Using yarn:

```sh
yarn add qpind
```

Using npm:

```sh
npm install qpind
```

## Usage

### `installPackage(packages, packageManager?, cwd?)`

Install dependencies in your root directory, if no package manager is defined it will try to detect one.

```js
// CommonJS
const { installPackage } = require("qpind");

// ESM
import { installPackage } from "qpind";

install("package-name");
```

### `detectPackageManager(cwd?)`

Detect the current Package Manager in the directory

```js
const { detectPackageManager } = require("qpind");

var packeManager = detectPackageManager();
// -> yarn || npm
```

## License

MIT - Made with ❤️ by Conner Luka Bachmann

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/qpind/latest.svg
[npm-version-href]: https://npmjs.com/package/qpind
[npm-downloads-src]: https://img.shields.io/npm/dt/qpind.svg
[npm-downloads-href]: https://npmjs.com/package/qpind
[github-actions-ci-src]: https://github.com/intevel/nqpind/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/intevel/qpind/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/qpind.svg
[license-href]: https://npmjs.com/package/qpind
