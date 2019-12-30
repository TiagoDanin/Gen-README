# {{beautiful gh.repo}}

{{#badges.list}}[![{{title}}]({{{badge}}})]({{{url}}}) {{/badges.list}}

{{{description}}}

{{#screenshot}}<p align="center"><img src="{{{.}}}"></p>{{/screenshot}}

{{showTextIf features "## Features"}}

{{#features}}
- {{{.}}}
{{/features}}

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the {{#atom}}[`apm`](https://github.com/atom/apm){{/atom}}{{^atom}}[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/){{/atom}} command line tool.

```sh
{{#atom}}
# APM
apm install {{name}}
{{/atom}}
{{^atom}}
# Yarn {{#yarn}}(Recomend){{/yarn}}
{{#preferGlobal}}
yarn global add {{name}}
{{/preferGlobal}}
{{^preferGlobal}}
yarn add {{name}}
{{/preferGlobal}}
{{/atom}}
# NPM {{#npm}}{{^yarn}}(Recomend){{/yarn}}{{/npm}}
{{#preferGlobal}}
npm install {{name}} --global
{{/preferGlobal}}
{{^preferGlobal}}
npm install {{name}} --save
{{/preferGlobal}}
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
{{#yarn}}
# Using Yarn
yarn test
{{/yarn}}
{{#npm}}
# Using NPM
npm run test
{{/npm}}
```

{{/scripts.test}}

## Dependencies

{{#dependencies}}
<details>
	<summary><a href="{{{repository}}}">{{name}}</a>: {{description}}</summary>
	<b>Author</b>: {{author}}</br>
	<b>License</b>: {{license}}</br>
	<b>Version</b>: {{version}}
</details>
{{/dependencies}}
{{^dependencies}}
None
{{/dependencies}}

{{showTextIf devDependencies "## Dev Dependencies"}}

{{#devDependencies}}
<details>
	<summary><a href="{{{repository}}}">{{name}}</a>: {{description}}</summary>
	<b>Author</b>: {{author}}</br>
	<b>License</b>: {{license}}</br>
	<b>Version</b>: {{version}}
</details>
{{/devDependencies}}

{{showTextIf related "## Related"}}

{{#related}}
<details>
	<summary><a href="{{{repository}}}">{{name}}</a>: {{description}}</summary>
	<b>Author</b>: {{author}}</br>
	<b>License</b>: {{license}}
</details>
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
