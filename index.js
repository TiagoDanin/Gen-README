#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
require('debug-console-js') // eslint-disable-line import/no-unassigned-import
const {merge} = require('lodash')
const gh = require('github-url-to-object')
const handlebars = require('handlebars')
const npmPackage = require('package-info')
const argv = require('minimist')(process.argv)

console.log('argv', argv)

const beautifulName = name => {
	return name
		.replace(/^./, name[0].toUpperCase())
		.replace(/-/g, ' ')
}

const showTextIf = (v, text) => {
	if (v && v.length != 0) {
		return text
	}

	return ''
}

const usageShow = (content, type) => {
	if (type == 'url') {
		return `- [${content.replace(/htt[ps]*:\/\//i, '')}](${content})`
	}

	return content
}

const usageShowCode = (type, text) => {
	if (type == 'url') {
		return ''
	}

	return text
}

const removeSpace = str => str.replace(/(\s*)$/g, '')

const removeNewLine = str => str.replace(/\n[\n]*\n/gs, '\n\n')

const cleanCode = str => removeSpace(removeNewLine(str))

const checkExample = data => {
	if (data.usage) {
		return data
	}

	const extensions = ['js', 'sh', 'md', 'vue', 'ts']
	const files = ['example', 'usage', 'docs', 'documentation', 'doc']
	extensions.forEach(ext => {
		files.forEach(file => {
			const pathFile = path.resolve(`${process.cwd()}/${file}.${ext}`)
			if (fs.existsSync(pathFile)) {
				if (ext === 'md') {
					data.documentation = pathFile
				} else if (ext === 'sh') {
					data.usage = {
						language: ext,
						content: cleanCode(fs.readFileSync(pathFile).toString())
					}
				} else {
					data.example = {
						language: ext,
						content: cleanCode(fs.readFileSync(pathFile).toString())
					}
					data.example.content = data.example.content.replace(
						/require\(['"]?\.\/['"]?\)/,
						`require('${data.name}')`
					)
				}
			}
		})
	})

	return data
}

const checkLicense = data => {
	data.license = {
		type: data.license
	}
	if (data.license.type.toLocaleLowerCase() === 'mit') {
		if (data.author.name && data.author.url) {
			data.license.authorWithUrl = `© [${data.author.name}](${data.author.url})`
		} else {
			data.license.authorWithUrl = `© ${(data.author.name || data.author)}`
		}
	} else {
		data.license.authorWithUrl = ''
	}

	return data
}

const checkDocumentation = data => {
	if (data.documentation) {
		if (data.documentation.startsWith('http')) {
			data.documentation = `- [${data.name} developer docs](${data.documentation})`
		} else if (data.documentation.startsWith('./') || data.documentation.startsWith('/')) {
			data.documentation = cleanCode(fs.readFileSync(data.documentation).toString())
		}
	}

	return data
}

const checkTest = data => {
	if (data.scripts.test && data.scripts.test.startsWith('echo')) {
		data.scripts.test = false
	}

	return data
}

const checkBadges = data => {
	const list = []
	if (data.travis) {
		list.push({
			title: 'Travis',
			badge: `https://img.shields.io/travis/${data.gh.user}/${data.gh.repo}.svg?branch=master&style=${data.badges.style}`,
			url: `${data.gh.travis_url}`
		})
	}

	if (data.xo) {
		list.push({
			title: 'XO code style',
			badge: `https://img.shields.io/badge/code%20style-XO-red.svg?style=${data.badges.style}`,
			url: 'https://github.com/xojs/xo'
		})
	}

	if (data.engines && data.engines.node) {
		list.push({
			title: 'Node',
			badge: `https://img.shields.io/node/v/${data.name}.svg?style=${data.badges.style}`,
			url: `https://npmjs.org/package/${data.name}`
		})
	}

	list.push({
		title: 'Version',
		badge: `https://img.shields.io/npm/v/${data.name}.svg?style=${data.badges.style}`,
		url: `https://npmjs.org/package/${data.name}`
	})
	list.push({
		title: 'Downloads',
		badge: `https://img.shields.io/npm/dt/${data.name}.svg?style=${data.badges.style}`,
		url: `https://npmjs.org/package/${data.name}`
	})

	data.badges.list = [...list, ...data.badges.list]
	// TODO https://img.shields.io/badge/<SUBJECT>-<STATUS>-<COLOR>.svg?style=flat-square
	// TODO if data.twitter return add in badges
	return data
}

const getInfoDeps = deps => {
	return Promise.all(deps.map(async dep => {
		const pkg = await npmPackage(dep).catch(() => {
			return {}
		})
		return {
			...pkg,
			name: dep,
			repository: `https://ghub.io/${dep}`
		}
	}))
}

const main = async () => {
	let data = {
		name: '',
		description: '',
		scripts: {
			test: false
		},
		author: '',
		license: '',
		repository: 'https://github.com/user/repo.git',
		dependencies: {},
		devDependencies: {},
		features: [],
		thanks: [],
		related: [],
		badges: {
			style: 'flat-square',
			list: []
		},
		preferGlobal: false,
		documentation: false,
		travis: false,
		atom: false,
		write: false,
		xo: false,
		engines: {}
	}

	const packageFile = path.resolve(`${process.cwd()}/package.json`)
	const config = path.resolve(`${process.cwd()}/.gen-readme.json`)
	const travis = path.resolve(`${process.cwd()}/.travis.yml`)

	data = merge(
		data,
		JSON.parse(fs.readFileSync(packageFile).toString())
	)

	if (fs.existsSync(config)) {
		data = merge(
			data,
			JSON.parse(fs.readFileSync(config).toString())
		)
	}

	if (fs.existsSync(travis)) {
		data.travis = true
	}

	const devDependenciesKeys = Object.keys(data.devDependencies)
	if (devDependenciesKeys.includes('xo')) {
		data.xo = true
	}

	const enginesKeys = Object.keys(data.engines)
	if (enginesKeys.includes('atom')) {
		data.atom = true
	}

	data = merge(
		data,
		argv
	)

	data.gh = gh(data.repository.url || data.repository)
	data = checkExample(data)
	data = checkLicense(data)
	data = checkDocumentation(data)
	data = checkTest(data)
	data = checkBadges(data)
	data.dependencies = await getInfoDeps(Object.keys(data.dependencies))
	data.devDependencies = await getInfoDeps(Object.keys(data.devDependencies))
	data.related = await getInfoDeps(data.related)

	console.log('data', data)

	handlebars.registerHelper('showTextIf', showTextIf)
	handlebars.registerHelper('beautiful', beautifulName)
	handlebars.registerHelper('usageShow', usageShow)
	handlebars.registerHelper('usageShowCode', usageShowCode)

	const template = fs.readFileSync(path.join(__dirname, 'template.md')).toString()
	let readme = handlebars.compile(template)(data)
	readme = cleanCode(removeNewLine(readme))

	console.log('readme', readme)

	if (data.write) {
		fs.writeFileSync('README.md', readme)
	}

	process.stdout.write(readme)
}

main().catch(async error => {
	console.log('error', error)
	process.stdout.write(error.toString())
	await new Promise(resolve => setTimeout(
		resolve,
		(3000)
	))
	return process.exit()
})
