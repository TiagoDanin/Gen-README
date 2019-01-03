# Gen README
[![Node](https://img.shields.io/node/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme)
[![Version](https://img.shields.io/npm/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme)
[![Downloads](https://img.shields.io/npm/dt/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme)
[![Travis](https://img.shields.io/travis/TiagoDanin/Gen-README.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/Gen-README)

Generate README.md from package.json contents

## Features
- Automate and improve your readme
- Awesome Badges
- List dependencies
- Load documentation

## Installation
This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
# NPM
npm install gen-readme --global
# Or Using Yarn
yarn global add gen-readme
```

## Usage
```sh
# Write to stdout
gen-readme package.json

# Pipe output into a new file
gen-readme package.json > README.md

# Add a Travis badge
gen-readme package.json --travis

# Output in README.md
gen-readme package.json --write

```
## Tests
To run the test suite, first install the dependencies, then run `test`:

```sh
# NPM
npm test
# Or Using Yarn
yarn test
```

## Dependencies
- [debug-console-js](https://ghub.io/debug-console-js): Use o &quot;debug&quot; via console.*
- [enquirer](https://ghub.io/enquirer): Stylish, intuitive and user-friendly prompt system. Fast and lightweight enough for small projects, powerful and extensible enough for the most advanced use cases.
- [gh-badges](https://ghub.io/gh-badges): Shields.io badge library
- [github-url-to-object](https://ghub.io/github-url-to-object): Extract user, repo, and other interesting properties from GitHub URLs
- [handlebars](https://ghub.io/handlebars): Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
- [lodash](https://ghub.io/lodash): Lodash modular utilities.
- [minimist](https://ghub.io/minimist): parse argument options
- [package-info](https://ghub.io/package-info): Get the information of a npm package

## Related
- [package-json-to-readme](https://ghub.io/package-json-to-readme): Generate a README.md from package.json contents
- [gen-package](https://ghub.io/gen-package): Intuitive and user-friendly generator of package.json

## Contributors
Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/Gen-README/issues). [List of all contributors](https://github.com/TiagoDanin/Gen-README/graphs/contributors).

## Thanks
- [zeke](https://github.com/zeke/package-json-to-readme/): Gen README is an fork of https://github.com/zeke/package-json-to-readme/

## License
[MIT](LICENSE) © [Tiago Danin](https://TiagoDanin.github.io)
