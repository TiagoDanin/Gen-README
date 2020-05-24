#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {merge} = require('lodash')
const debug = require('debug')
const gh = require('github-url-to-object')
const handlebars = require('handlebars')
const meow = require('meow')
const npmPackage = require('package-info')
const updateNotifier = require('update-notifier')
const locatePath = require('locate-path')

const log = (type, input) => debug(`gen-readme:${type}`)(input)

const cwd = process.cwd()
const cli = meow(`
	Usage
		$ gen-readme

	Options
		--travis       Force enable Travis CI Badge
		--xo           Force enable XO Badge
		--no-badge     Disable default Badge
		--write, -w    Output README.md file

	Examples
		$ gen-readme package.json > README.md
		$ gen-readme package.json --travis --xo
		$ gen-readme package.json --write
`, {
	booleanDefault: false,
	flags: {
		travis: {
			type: 'boolean'
		},
		xo: {
			type: 'boolean'
		},
		badge: {
			type: 'boolean',
			default: true
		},
		write: {
			type: 'boolean',
			alias: 'w'
		}
	}
})
updateNotifier({pkg: cli.pkg}).notify()

const beautifulName = name => {
	return name
		.replace(/^./, name[0].toUpperCase())
		.replace(/-/g, ' ')
}

const showTextIf = (v, text) => {
	if (v && v.length !== 0) {
		return text
	}

	return ''
}

const usageShow = (content, type) => {
	if (type === 'url') {
		return `- [${content.replace(/htt[ps]*:\/\//i, '')}](${content})`
	}

	return content
}

const usageShowCode = (type, text) => {
	if (type === 'url') {
		return ''
	}

	return text
}

const removeSpace = string => string.replace(/(\s*)$/g, '')

const removeNewLine = string => string.replace(/\n+\n/gs, '\n\n')

const cleanCode = string => removeSpace(removeNewLine(string))

const getExtension = file => file.split('.').pop()

const addPaths = (paths, files) => {
	const newPaths = []

	paths.forEach(directory => {
		files.forEach(file => {
			newPaths.push(path.join(directory, file))
		})
	})

	return newPaths
}

const addExtensions = (files, extensions) => {
	const fileWithExtensions = []

	extensions.forEach(ext => {
		files.forEach(file => {
			fileWithExtensions.push(`${file}.${ext}`)
		})
	})

	return fileWithExtensions
}

const getFile = fileWithExtensions => {
	const files = fileWithExtensions.map(file => path.join(cwd, file))
	return locatePath(files)
}

const checkFiles = async data => {
	const documentation = await getFile(addExtensions(['docs', 'documentation', 'doc', 'usage'], ['md']))
	const example = await getFile(addExtensions(['example'], ['js', 'sh', 'md', 'vue', 'ts']))
	const usage = await getFile(addExtensions(['usage'], ['sh', 'bash']))
	const screenshotFiles = addExtensions(['screenshot'], ['png', 'jpg', 'gif'])
	const screenshot = await getFile(addPaths(['media', ''], screenshotFiles))
	const yarn = await getFile(addExtensions(['yarn'], ['lock']))
	const npm = await getFile(addExtensions(['package-lock'], ['json']))

	if (documentation) {
		data.documentation = documentation
	}

	if (example) {
		data.example = {
			language: getExtension(example),
			content: cleanCode(fs.readFileSync(example).toString())
		}

		data.example.content = data.example.content.replace(
			/require\((['"])?\.\/*['"]?\)/,
			`require($1${data.name}$1)`
		)
	}

	if (usage) {
		data.usage = {
			language: getExtension(usage),
			content: cleanCode(fs.readFileSync(usage).toString())
		}
	}

	if (screenshot) {
		data.screenshot = path.posix.relative(cwd, screenshot)
	}

	if (yarn) {
		data.yarn = true
	}

	if (npm) {
		data.npm = true
	}

	if (!data.yarn && !data.npm) {
		data.yarn = true // Force use Yarn :)
	}

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
	} else {
		data.scripts.test = {
			...data,
			...data.scripts.test
		}
	}

	return data
}

const checkBadges = data => {
	let list = []
	if (data.travis && data.badge) {
		list.push({
			title: 'Travis',
			badge: `https://img.shields.io/travis/${data.gh.user}/${data.gh.repo}.svg?branch=master&style=${data.badges.style}`,
			url: `${data.gh.travis_url}`,
			color: 'green'
		})
	}

	if (data.xo && data.badge) {
		list.push({
			title: 'XO code style',
			badge: `https://img.shields.io/badge/code%20style-XO-red.svg?style=${data.badges.style}`,
			url: 'https://github.com/xojs/xo',
			color: 'red'
		})
	}

	if (data.engines && data.engines.node && data.badge) {
		list.push({
			title: 'Node',
			badge: `https://img.shields.io/node/v/${data.name}.svg?style=${data.badges.style}`,
			url: `https://npmjs.org/package/${data.name}`,
			color: 'green'
		})
	}

	if (data.badge) {
		list.push({
			title: 'Version',
			badge: `https://img.shields.io/npm/v/${data.name}.svg?style=${data.badges.style}`,
			url: `https://npmjs.org/package/${data.name}`,
			color: 'blue'
		})
		list.push({
			title: 'Downloads',
			badge: `https://img.shields.io/npm/dt/${data.name}.svg?style=${data.badges.style}`,
			url: `https://npmjs.org/package/${data.name}`,
			color: 'green'
		})
	}

	if (data.badges.list.length > 0) {
		data.badges.list.map(badge => {
			let title = ''
			let status = ''
			let color = ''
			let url = ''

			if (typeof badge === 'string') {
				const parameter = badge.split(':')
				if (parameter.length < 4) {
					return log('badges', 'Badge format not is "TITLE:STATUS:COLOR:URL"')
				}

				title = parameter[0]
				status = parameter[1]
				color = parameter[2]
				url = parameter[3]

				for (let i = 4; i < parameter.length; i++) {
					url += parameter[i]
				}
			} else {
				title = badge.title || badge.subject || ''
				status = badge.status || ''
				color = badge.color || 'green'
				url = badge.url || ''
			}

			list.push({
				title,
				badge: `https://img.shields.io/badge/${encodeURI(title)}-${encodeURI(status)}-${encodeURI(color)}.svg?style=${data.badges.style}`,
				url,
				color
			})

			return list
		})
	}

	if (data.badges.sort) {
		if (typeof data.badges.sort === 'boolean') {
			data.badges.sort = 'name'
		}

		const type = data.badges.sort
		list.sort((a, b) => {
			const indexA = a[type].toUpperCase()
			const indexB = b[type].toUpperCase()
			if (indexA < indexB) {
				return data.badges.sortReverse ? 1 : -1
			}

			if (indexA > indexB) {
				return data.badges.sortReverse ? -1 : 1
			}

			return 0
		})
	}

	if (data.badges.first.length > 0) {
		data.badges.first.reverse().map(title => {
			const findBadge = list.find(badge => badge.title === title)
			if (findBadge) {
				list = [...[findBadge], ...list]
			}

			return findBadge
		})
	}

	const allTitles = list.map(badge => badge.title)
	data.badges.list = list.filter((badge, index) => allTitles.indexOf(badge.title) === index)

	return data
}

const getInfoDeps = (deps, isObject = true) => {
	const depsList = isObject ? Object.keys(deps) : deps
	return Promise.all(depsList.map(async dep => {
		const pkg = await npmPackage(dep).catch(() => {
			return {}
		})
		return {
			...pkg,
			name: dep,
			repository: `https://ghub.io/${dep}`,
			version: isObject ? deps[dep] : '0.0.0'
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
			list: [],
			sort: false,
			first: ['Travis', 'Downloads', 'Node', 'Version', 'XO code style']
		},
		preferGlobal: false,
		documentation: false,
		travis: false,
		atom: false,
		yarn: false,
		write: false,
		xo: false,
		badge: true,
		engines: {}
	}

	const packageFile = path.join(cwd, 'package.json')
	const config = path.join(cwd, '.gen-readme.json')
	const travis = path.join(cwd, '.travis.yml')

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

	Object.keys(cli.flags).map(f => {
		if (!cli.flags[f]) {
			delete cli.flags[f]
		}

		return f
	})

	data = merge(
		data,
		cli.flags
	)

	data.gh = gh(data.repository.url || data.repository) // FIX: if null
	data = await checkFiles(data)
	data = checkLicense(data)
	data = checkDocumentation(data)
	data = checkTest(data)
	data = checkBadges(data)
	data.dependencies = await getInfoDeps(data.dependencies)
	data.devDependencies = await getInfoDeps(data.devDependencies)
	data.related = await getInfoDeps(data.related, false)

	log('data', data)

	handlebars.registerHelper('showTextIf', showTextIf)
	handlebars.registerHelper('beautiful', beautifulName)
	handlebars.registerHelper('usageShow', usageShow)
	handlebars.registerHelper('usageShowCode', usageShowCode)

	const template = fs.readFileSync(path.join(__dirname, 'template.md')).toString()
	let readme = handlebars.compile(template)(data)
	readme = cleanCode(removeNewLine(readme))

	log('readme', readme)

	if (data.write) {
		fs.writeFileSync('README.md', readme)
	}

	process.stdout.write(readme)
	return data
}

main().catch(async error => {
	log('error', error)
	console.error(error)
	await new Promise(resolve => setTimeout(
		resolve,
		(3000)
	))
	return process.exit()
})
