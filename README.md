# Gen README

[![Travis](https://img.shields.io/travis/TiagoDanin/Gen-README.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/Gen-README) [![XO code style](https://img.shields.io/badge/code%20style-XO-red.svg?style=flat-square)](https://github.com/xojs/xo) [![Node](https://img.shields.io/node/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) [![Version](https://img.shields.io/npm/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) [![Downloads](https://img.shields.io/npm/dt/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) 

Generate a README.md from package.json contents.

## Features

- Automate and improve your readme
- Awesome badges (Travis CI, XO, NPM Download...)
- List dependencies
- Load documentation

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the  [`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/) command line tools.

```sh
# NPM
npm install gen-readme --global
# Or Using Yarn
yarn global add gen-readme
```

## Usage

```sh
# Show help
gen-readme --help

# Write to stdout
gen-readme package.json

# Pipe output into a new file
gen-readme package.json > README.md

# Add a Travis badge (if not exit .travis.yml)
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

- [debug](https://ghub.io/debug): small debugging utility
- [find-up](https://ghub.io/find-up): Find a file or directory by walking up parent directories
- [gh-badges](https://ghub.io/gh-badges): Shields.io badge library
- [github-url-to-object](https://ghub.io/github-url-to-object): Extract user, repo, and other interesting properties from GitHub URLs
- [handlebars](https://ghub.io/handlebars): Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
- [lodash](https://ghub.io/lodash): Lodash modular utilities.
- [meow](https://ghub.io/meow): CLI app helper
- [package-info](https://ghub.io/package-info): Get the information of a npm package
- [update-notifier](https://ghub.io/update-notifier): Update notifications for your CLI app

## Dev Dependencies

- [xo](https://ghub.io/xo): JavaScript happiness style linter ❤️

## Related

- [package-json-to-readme](https://ghub.io/package-json-to-readme): Generate a README.md from package.json contents
- [gen-package](https://ghub.io/gen-package): Intuitive and user-friendly generator of package.json

## Contributors

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/Gen-README/issues). [List of all contributors](https://github.com/TiagoDanin/Gen-README/graphs/contributors).

## Thanks

- [zeke](https://github.com/zeke/package-json-to-readme/): Gen README is an fork of https://github.com/zeke/package-json-to-readme/

## License

[MIT](LICENSE) © [Tiago Danin](https://TiagoDanin.github.io)