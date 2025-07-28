#!/usr/bin/env bun

import Bun from 'bun'
import { consola } from 'consola'
import minimist from 'minimist'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseSync } from 'oxc-parser'
import { join, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'
import type { RegistryItem } from '../src/registry/schema'

const argv = minimist(process.argv.slice(2))
const ROOT_PATH = path.join(process.cwd(), '.')

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
  ['reka-ui', []],
  ['@vueuse/core', []],
  ['vue-sonner', []],
  ['vaul-vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['embla-carousel-vue', []],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
  ['@iconify/vue', []],
  ['clsx', []],
  ['tailwind-merge', []],
])

const REGISTRY_DEPENDENCY = '@/'
const CATEGORIES = ['authentication', 'sidebar', 'login', 'dashboard']

async function readFile(filepath: string, _options = {}) {
  const file = Bun.file(filepath)

  return await file.text()
}

async function readDirectory(
  path: string,
  options: { recursive?: boolean, withFileTypes?: boolean, encoding?: string } = {},
) {
  if (!existsSync(path)) {
    consola.warn(`The directory ${path} does not exist. Skipping...`)

    return []
  }

  // @ts-expect-error ignore readdir options type
  return readdir(path, options)
}

function getCategory(text: string) {
  // Remove all numbers from the string and convert it to lower case
  return CATEGORIES.find(category => category === text.replace(/\d+/g, '').toLowerCase()) || undefined
}

async function writeFile(path: string, payload: any) {
  Bun.write(path, payload)
}

// async function removeFile(filename: string) {
//   const file = Bun.file(filename)

//   if (await file.exists) {
//     await Bun.$`rm ${filename}`
//   }
// }

async function getFileDependencies(filename: string, sourceCode: string) {
  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  const populateDeps = (source) => {
    const peerDeps = DEPENDENCIES.get(source)
    // const taggedDeps = DEPENDENCIES_WITH_TAGS.get(source)
    if (peerDeps !== undefined) {
      // if (taggedDeps !== undefined)
      //   dependencies.add(taggedDeps)
      // else
      dependencies.add(source)
      peerDeps.forEach(dep => dependencies.add(dep))
    }

    if (source?.startsWith(REGISTRY_DEPENDENCY) && !source.endsWith('.vue')) {
      const component = source.split('/').slice(-1)[0]
      const registryUrl = `${process.env.VITE_REGISTRY_URL}/r/${component}.json`

      registryDependencies.add(registryUrl)
    }
  }

  if (filename.endsWith('.vue')) {
    const parsed = parse(sourceCode, { filename })
    if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
      const compiled = compileScript(parsed.descriptor, { id: 'id' })

      Object.values(compiled.imports!).forEach((value) => {
        populateDeps(value.source)
      })
    }
  }

  if (filename.endsWith('.ts')) {
    const ast = parseSync(filename, sourceCode, {
      sourceType: 'module',
    })

    const modules = ast.module.staticImports

    modules.forEach((module: any) => {
      populateDeps(module.moduleRequest.value)
    })
  }

  return { registryDependencies, dependencies }
}

async function parseComment(filename: string) {
  const file = Bun.file(filename)
  const code = await file.text()
  const result = parseSync(filename, code)

  // Read the first line block comment in the index.ts file only
  if (!result.comments.length || result.comments[0]?.type !== 'Block' || result.comments[0]?.start !== 0)
    return ['', '']

  const lines = result.comments[0]?.value.split('\n')

  // The first line is the title
  const title = lines[1].trim().replace('* ', '')

  // The third line until the end is the description
  const description = lines.slice(3).reduce(
    (acc, line) => `${acc + line.replace('* ', '')}`,
    '',
  ).trim()

  return [title, description]
}

async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = await readDirectory(componentPath, {
    withFileTypes: true,
  })

  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'
  let title = ''
  let description = ''

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('src', 'components', 'ui', componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })

    files.push({ path: relativePath, type })

    // parse title and description from block comment in index.ts
    if (dirent.name === 'index.ts') {
      [title, description] = await parseComment(filepath)

      continue
    }

    // only grab deps from the vue files
    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: componentName,
    type,
    title,
    description,
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}

async function crawlUI(rootPath: string) {
  if (argv['skip-ui'])
    return []

  const dir = await readDirectory(rootPath, { recursive: true, withFileTypes: true })
  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(rootPath, dirent.name)
    const ui = await buildUIRegistry(componentPath, dirent.name)
    uiRegistry.push(ui)
  }

  return uiRegistry
}

async function buildBlockRegistry(blockPath: string, blockName: string) {
  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const registryItem: RegistryItem = (await import(`${blockPath}/registry-item.ts`)).registryItem

  if (!registryItem) {
    console.warn(`No registry item found for ${blockPath}`)

    return
  }

  for (const item of registryItem.files ?? []) {
    const { path, type, target: targetPath } = item
    const filepath = join(blockPath, path)
    const relativePath = join('src', 'registry', 'blocks', blockName, path)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = targetPath && join('~', targetPath)

    if (type === 'registry:page' || type === 'registry:file') {
      files.push({ content: source, path: relativePath, type, target: target as string })
    }
    else {
      files.push({ content: source, path: relativePath, type, target: target as string | undefined })
    }

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: blockName,
    type: 'registry:block',
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
    categories: getCategory(blockName) ? [getCategory(blockName) as string] : undefined,
  } satisfies RegistryItem
}

async function crawlBlock(rootPath: string) {
  if (argv['skip-block'])
    return []

  const dir = await readDirectory(rootPath, { withFileTypes: true })
  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    const blockPath = `${rootPath}/${dirent.name}`

    if (!dirent.isFile()) {
      // Skip directories that don't have registry-item.ts
      if (!existsSync(`${blockPath}/registry-item.ts`))
        continue

      const result = await buildBlockRegistry(
        blockPath,
        dirent.name,
      )

      if (result && result.files.length) {
        registry.push(result)
      }

      continue
    }

    // Skip non-vue files
    if (!dirent.name.endsWith('.vue'))
      continue

    // Process single file block as a component
    const type = `registry:component` as const
    const [name] = dirent.name.split('.vue')
    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = join('~', 'src', 'components', dirent.name)

    const file = {
      name: dirent.name,
      content: source,
      path: filepath,
      target,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    const kebabName = name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()

    registry.push({
      name: kebabName,
      type,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      categories: getCategory(name) ? [getCategory(name) as string] : undefined,
    })
  }

  return registry
}

async function crawlLib(rootPath: string) {
  if (argv['skip-lib'])
    return []

  const type = `registry:lib` as const
  const dir = await readDirectory(rootPath, { withFileTypes: true })
  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.name.endsWith('.ts') || !dirent.isFile())
      continue

    const [name] = dirent.name.split('.ts')
    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('src', 'lib', dirent.name)

    const file = {
      name,
      content: source,
      path: relativePath,
      type,
    }

    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)
    const [title, description] = await parseComment(filepath)

    registry.push({
      name,
      type,
      title,
      description,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
    })
  }

  return registry
}

export async function buildRegistry() {
  const registry: RegistryItem[] = []
  const uiPath = resolve('src', 'components', 'ui')
  const blockPath = resolve('src', 'registry', 'blocks')
  const libPath = resolve('src', 'lib')
  // const hookPath = resolve(registryPath, 'hook')

  const [ui, block, lib] = await Promise.all([
    crawlUI(uiPath),
    crawlBlock(blockPath),
    crawlLib(libPath),
    // crawlHook(hookPath), // In Vue, it is known as composables
  ])

  registry.push(...ui, ...block, ...lib)

  return registry
}

async function main() {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is required to generate registry url')
  }

  try {
    consola.start('Creating registry.json file...')
    const items = await buildRegistry()

    const registrySchema = {
      $schema: 'https://shadcn-vue.com/schema/registry.json',
      name: 'shadcn-vue-ex',
      homepage: process.env.VITE_REGISTRY_URL,
      items,
    }

    await writeFile(
      path.join(ROOT_PATH, 'registry.json'),
      JSON.stringify(registrySchema, null, 2),
    )
    consola.success('Registry created successfully.')
  }
  catch (error) {
    consola.error(error)
    process.exit(1)
  }

  if (argv['skip-build'])
    return

  try {
    consola.start('Building registry...')
    await Bun.$`rm -rf public/r`
    await Bun.$`bunx --bun shadcn-vue build`
    consola.success('Registry built successfully.')
  }
  catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

main()
