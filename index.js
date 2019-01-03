#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const gh = require('github-url-to-object')
const mustache = require('mustache')
const argv = require('minimist')(process.argv)
const { prompt } = require('enquirer')

const checkExample = () => {
	const extensions = ['js', 'sh']
	const files = ['example', '.env.example', 'usage', '.env.usage']
	var usage = {}
	extensions.forEach((ext) => {
		files.forEach((file) => {
			let exampleFile = path.resolve(`${process.cwd()}/${file}.${ext}`)
			if (fs.existsSync(exampleFile)) {
				usage = {
					language: ext,
					content: fs.readFileSync(exampleFile).toString()
				}

				if (ext == 'js') {
					//replace require('./')
					usage.content = data.usage.content.replace(
						/require\(['"]?\.\/['"]?\)/,
						`require("${data.name}")`
					)
				}
			}
		})
	})
	return usage
}

const getInfoDeps = async (deps) => {
	return Object.keys(deps).map((dep) => {
		return {
			name: dep,
			repository: `https://ghub.io/${{dep}}`,
			description: '' //TODO GET VIA API NPM
		}
	})
}

const main = async() => {
	var data = {
		name: '',
		description: '',
		scripts: {
			test: false
		},
		repository: 'https://github.com/user/repo.git',
		dependencies: {},
		devDependencies: {},
		preferGlobal: false,
		features: [],
		documentation: false,
		travis: false,
		badges: [],
		write: false
	}
	const packageFile = path.resolve(`${process.cwd()}/package.json`)
	data = _.merge(
		data,
		JSON.parse(fs.readFileSync(packageFile).toString())
	)
	data = _.merge(
		data,
		argv
	)

	data.gh = gh(data.repository.url || data.repository)
	data.usage = checkExample()
	data.dependencies = await getInfoDeps(data.dependencies)
	data.devDependencies = await getInfoDeps(data.devDependencies)

	//TODO parse author and add in data.author = '© [{{name}}]({{url}})' if license = 'mit'

	//TODO if documentation is link or file or text

	//TODO if teste not start with "echo" return test = false

	//TODO Badges
	//https://npmjs.org/package/{{name}}
	//https://img.shields.io/npm/v/{{name}}.svg?style=flat-square
	//https://img.shields.io/node/v/{{name}}.svg?style=flat-square
	//https://img.shields.io/npm/dt/{{name}}.svg?style=flat-square
	//https://img.shields.io/travis/{{gh.user}}/{{gh.repo}}.svg?branch=master&style=flat-square
	//[![title](badge)](url)
	//TODO if data.twitter return add in badges
	//TODO if data.badges return add in badges

	const template = fs.readFileSync(path.join(__dirname, 'template.md')).toString()
	const readme = mustache.render(template, data)
	//TODO Use terminal output
	console.log(readme)
	if (data.write) {
		fs.writeFileSync('README.md', readme)
	}
}
main()
