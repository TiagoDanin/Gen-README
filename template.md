# {{name}}
{{badges}}

{{description}}

{{#features}}
## Features
- {{{.}}}
{{/features}}

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
# NPM
{{#preferGlobal}}
npm install {{name}} --global
{{/preferGlobal}}
{{^preferGlobal}}
npm install {{name}} --save
{{/preferGlobal}}
# Or Using Yarn
{{#preferGlobal}}
yarn global add {{name}}
{{/preferGlobal}}
{{^preferGlobal}}
yarn add {{name}}
{{/preferGlobal}}
```

{{#usage}}
## Usage

```{{language}}
{{{content}}}
```
{{/usage}}

{{#documentation}}
## Documentation
{{{.}}}
{{/documentation}}

{{#scripts.test}}
## Tests

To run the test suite, first install the dependencies, then run `test`:

```sh
# NPM
npm test
# Or Using Yarn
yarn test
```
{{/scripts.test}}

## Dependencies

{{#dependencies}}
- [{{name}}]({{{repository}}}): {{description}}
{{/dependencies}}
{{^dependencies}}
None
{{/dependencies}}

{{#devDependencies}}
## Dev Dependencies
{{/devDependencies}}

{{#devDependencies}}
- [{{name}}]({{{repository}}}): {{description}}
{{/devDependencies}}

{{#license}}
## License
[{{.}}](LICENSE)
{{/license}}
