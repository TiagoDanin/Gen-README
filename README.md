# Gen README

[![Travis](https://img.shields.io/travis/TiagoDanin/Gen-README.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/Gen-README) [![Downloads](https://img.shields.io/npm/dt/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) [![Node](https://img.shields.io/node/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) [![Version](https://img.shields.io/npm/v/gen-readme.svg?style=flat-square)](https://npmjs.org/package/gen-readme) [![Fork](https://img.shields.io/badge/Fork-Package%20Json%20To%20Readme-blue.svg?style=flat-square)](https//github.com/zeke/package-json-to-readme) [![XO code style](https://img.shields.io/badge/code%20style-XO-red.svg?style=flat-square)](https://github.com/xojs/xo) 

Generate a README.md from package.json contents.

## Features

- Automate and improve your readme
- Awesome badges (Travis CI, XO, NPM Download...)
- List dependencies
- Load documentation
- Sort dependencies, badges and others keys
- Screenshot

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the [`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/) command line tool.

```sh
# Yarn (Recomend)
yarn global add gen-readme
# NPM 
npm install gen-readme --global
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

# Disable default badges
gen-readme package.json --no-badges
```

## Tests

To run the test suite, first install the dependencies, then run `test`:

```sh
# Using Yarn
yarn test
```

## Dependencies

<details>
	<summary><a href="https://ghub.io/debug">debug</a>: small debugging utility</summary>
	<b>Author</b>: TJ Holowaychuk</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^4.1.1
</details>
<details>
	<summary><a href="https://ghub.io/github-url-to-object">github-url-to-object</a>: Extract user, repo, and other interesting properties from GitHub URLs</summary>
	<b>Author</b>: zeke</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^4.0.4
</details>
<details>
	<summary><a href="https://ghub.io/handlebars">handlebars</a>: Handlebars provides the power necessary to let you build semantic templates effectively with no frustration</summary>
	<b>Author</b>: Yehuda Katz</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^4.5.3
</details>
<details>
	<summary><a href="https://ghub.io/locate-path">locate-path</a>: Get the first path that exists on disk of multiple paths</summary>
	<b>Author</b>: Sindre Sorhus</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^5.0.0
</details>
<details>
	<summary><a href="https://ghub.io/lodash">lodash</a>: Lodash modular utilities.</summary>
	<b>Author</b>: John-David Dalton</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^4.17.15
</details>
<details>
	<summary><a href="https://ghub.io/meow">meow</a>: CLI app helper</summary>
	<b>Author</b>: Sindre Sorhus</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^6.0.0
</details>
<details>
	<summary><a href="https://ghub.io/package-info">package-info</a>: Get the information of a npm package</summary>
	<b>Author</b>: Alessandro Minoccheri</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^3.0.2
</details>
<details>
	<summary><a href="https://ghub.io/update-notifier">update-notifier</a>: Update notifications for your CLI app</summary>
	<b>Author</b>: Sindre Sorhus</br>
	<b>License</b>: BSD-2-Clause</br>
	<b>Version</b>: ^4.0.0
</details>

## Dev Dependencies

<details>
	<summary><a href="https://ghub.io/xo">xo</a>: JavaScript linter with great defaults</summary>
	<b>Author</b>: Sindre Sorhus</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^0.25.3
</details>

## Related

<details>
	<summary><a href="https://ghub.io/package-json-to-readme">package-json-to-readme</a>: Generate a README.md from package.json contents</summary>
	<b>Author</b>: Zeke Sikelianos</br>
	<b>License</b>: MIT
</details>
<details>
	<summary><a href="https://ghub.io/gen-package">gen-package</a>: Intuitive and user-friendly generator of package.json</summary>
	<b>Author</b>: TiagoDanin</br>
	<b>License</b>: MIT
</details>

## Contributors

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/Gen-README/issues). [List of all contributors](https://github.com/TiagoDanin/Gen-README/graphs/contributors).

## Thanks

- [zeke](https://github.com/zeke/package-json-to-readme/): Gen README is an fork of https://github.com/zeke/package-json-to-readme/

## License

[MIT](LICENSE) © [Tiago Danin](https://TiagoDanin.github.io)