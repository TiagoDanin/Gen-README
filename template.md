# {{beautiful gh.repo}}

{{#badges.list}}[![{{title}}]({{{badge}}})]({{{url}}}) {{/badges.list}}

{{{description}}}

{{showTextIf features "## Features"}}

{{#features}}
- {{{.}}}
{{/features}}

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the {{#atom}}[`apm`](https://github.com/atom/apm){{/atom}} {{^atom}}[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/){{/atom}} command line tools.

```sh
{{#atom}}
# APM
apm install {{name}}
{{/atom}}
{{^atom}}
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
{{/atom}}
```

{{#usage}}
## Usage

{{{usageShowCode language "```"}}}{{usageShowCode language language}}
{{{usageShow content language}}}
{{{usageShowCode language "```"}}}
{{/usage}}

{{#example}}
## Example

{{{usageShowCode language "```"}}}{{usageShowCode language language}}
{{{usageShow content language}}}
{{{usageShowCode language "```"}}}
{{/example}}

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

{{showTextIf devDependencies "## Dev Dependencies"}}

{{#devDependencies}}
- [{{name}}]({{{repository}}}): {{description}}
{{/devDependencies}}

{{showTextIf related "## Related"}}

{{#related}}
- [{{name}}]({{{repository}}}): {{description}}
{{/related}}

## Contributors

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/{{gh.user}}/{{gh.repo}}/issues). [List of all contributors](https://github.com/{{gh.user}}/{{gh.repo}}/graphs/contributors).

{{showTextIf thanks "## Thanks"}}

{{#thanks}}
- [{{name}}]({{{url}}}): {{description}}
{{/thanks}}

{{#license}}     
## License

[{{type}}](LICENSE) {{{authorWithUrl}}}
{{/license}}
