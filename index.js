#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const mustache = require('mustache')
const { prompt } = require('enquirer')
const gh = require('github-url-to-object')

const getInfoDeps = (deps) => {
	return Object.keys(deps).map((dep) => {
		return {
			name: dep,
			repository: `https://ghub.io/${{dep}}`,
			description: '' //TODO GET VIA API NPM
		}
	})
}

const main = async() => {
	var pkg = {
		name: '',
		description: '',
		scripts: {
			test: false
		},
		repository: 'https://github.com/user/repo.git',
		dependencies: {},
		devDependencies: {},
		preferGlobal: false
	}
	const opt = {
		travis: true
	}
	const packageFile = path.resolve(`${process.cwd()}/package.json`)
	pkg = _.merge(
		pkg,
		JSON.parse(fs.readFileSync(packageFile).toString())
	)
	pkg.gh = gh(pkg.repository.url || pkg.repository)

	const extensions = ['js', 'sh']
	const files = ['example', '.env.example', 'usage', '.env.usage']
	extensions.forEach((ext) => {
		files.forEach((file) => {
			let exampleFile = path.resolve(`${process.cwd()}/${file}.${ext}`)
			if (fs.existsSync(exampleFile)) {
				pkg.usage = {
					language: ext,
					content: fs.readFileSync(exampleFile).toString()
				}

				if (ext == 'js') {
					//replace require('./')
					pkg.usage.content = pkg.usage.content.replace(
						/require\(['"]?\.\/['"]?\)/,
						`require("${pkg.name}")`
					)
				}
			}
		})
	})

	pkg.dependencies = getInfoDeps(pkg.dependencies)
	pkg.devDependencies = getInfoDeps(pkg.devDependencies)

	//https://npmjs.org/package/{{name}}
	//https://img.shields.io/npm/v/{{name}}.svg?style=flat-square
	//https://img.shields.io/node/v/{{name}}.svg?style=flat-square
	//https://img.shields.io/npm/dt/{{name}}.svg?style=flat-square
	//https://img.shields.io/travis/{{gh.user}}/{{gh.repo}}.svg?branch=master&style=flat-square
	//[![title](badge)](url)

	const template = fs.readFileSync(path.join(__dirname, 'template.md')).toString()
	const readme = mustache.render(template, pkg)
	console.log(readme)
	fs.writeFileSync('README.md', readme)
}
main()
