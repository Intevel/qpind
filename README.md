# qpind

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![License][license-src]][license-href]

Install dependecies quick & programmatically 📦

<p align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0" /><br>
<i>⚠️ This project is archived ⚠️</b><br>
<sub>Use <a href="https://github.com/antfu/install-pkg">antfu/install-pkg</a> instead</sub><br>
<img width="2000" height="0" />
</td>
</tbody>
</table>
</p>

## Install


```sh
# Using npm:
npm install qpind

# Using yarn:
yarn add qpind
```


## Usage

### `installPackage(packages, fallbackToNpm?, packageManager?, cwd?)`

Install dependencies in your root directory, if no package manager is defined it will try to detect one of the following:
- yarn
- npm
- pnpm

```js
// CommonJS
const { installPackage } = require("qpind");

// ESM
import { installPackage } from "qpind";

installPackage("package-name");
```

### `detectPackageManager(fallbackToNpm?, cwd?)`

Detect the current Package Manager in the directory

```js
const { detectPackageManager } = require("qpind");

var packeManager = detectPackageManager();
// -> yarn || npm || pnpm
```

## License

MIT - Made with ❤️ by Conner Luka Bachmann

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/qpind/latest.svg
[npm-version-href]: https://npmjs.com/package/qpind
[npm-downloads-src]: https://img.shields.io/npm/dt/qpind.svg
[npm-downloads-href]: https://npmjs.com/package/qpind
[github-actions-ci-src]: https://github.com/intevel/qpind/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/intevel/qpind/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/qpind.svg
[license-href]: https://npmjs.com/package/qpind
