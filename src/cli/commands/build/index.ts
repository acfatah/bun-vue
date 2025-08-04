import { Command } from 'commander'
import { consola } from 'consola'
import { existsSync } from 'node:fs'
import process from 'node:process'
import { join, resolve } from 'pathe'
import type { RegistryItem } from '../../../registry/schema'
import {
  parseComment,
  readDirectory,
  readFile,
  rimraf,
  writeFile,
} from '../../utils'
import { buildBlocksRegistry } from './build-blocks-registry'
import { buildComponentsRegistry } from './build-components-registry'
import { buildIcons } from './build-icons'
import { buildIndexJson } from './build-index-json'
import { buildStyles } from './build-styles'
import { buildThemes } from './build-themes'
import { buildUIRegistry } from './build-ui-registry'
import { getFileDependencies } from './get-file-dependecies'

interface BuildCommandOptions {
  output: string
  skipBuild: boolean
  skipUi: boolean
  skipComponents: boolean
  skipBlocks: boolean
  skipLib: boolean
  skipComposables: boolean
}

const ROOT_PATH = join(__dirname, '..', '..', '..', '..')
export const REGISTRY_PATH = join('src', 'registry')
export const REGISTRY_OUTPUT_PATH = join(ROOT_PATH, 'public', 'r')
export const UI_PATH = join(REGISTRY_PATH, 'components', 'ui')
export const COMPONENTS_PATH = join(REGISTRY_PATH, 'components')
export const BLOCKS_PATH = join(REGISTRY_PATH, 'blocks')
const LIB_PATH = join(REGISTRY_PATH, 'lib')
const COMPOSABLES_PATH = join(REGISTRY_PATH, 'composables')

let skipBuild: boolean
let skipUi: boolean
let skipComponents: boolean
let skipBlocks: boolean
let skipLib: boolean
let skipComposables: boolean

async function crawlUI() {
  if (skipUi)
    return []

  const path = resolve(ROOT_PATH, UI_PATH)
  const dir = await readDirectory(path, { recursive: true, withFileTypes: true })
  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(ROOT_PATH, UI_PATH, dirent.name)
    const registryItem = await buildUIRegistry(componentPath, dirent.name)
    uiRegistry.push(registryItem)
  }

  return uiRegistry
}

async function crawlComponents() {
  if (skipComponents)
    return []

  const path = resolve(ROOT_PATH, COMPONENTS_PATH)
  const dir = await readDirectory(path, { withFileTypes: true })
  const componentsRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isFile() || !dirent.name.endsWith('.vue'))
      continue

    const component = await buildComponentsRegistry(dirent.name)

    if (component)
      componentsRegistry.push(component)
  }

  return componentsRegistry
}

async function crawlBlock() {
  if (skipBlocks)
    return []

  const path = resolve(ROOT_PATH, BLOCKS_PATH)
  const dir = await readDirectory(path, { withFileTypes: true })
  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    const blockPath = `${path}/${dirent.name}`

    if (!dirent.isFile()) {
      // Skip directories that don't have metadata.ts
      if (!existsSync(`${blockPath}/metadata.ts`))
        continue

      const result = await buildBlocksRegistry(
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
    const component = await buildComponentsRegistry(dirent.name)

    if (component)
      registry.push(component)
  }

  return registry
}

async function crawlLib() {
  if (skipLib)
    return []

  const type = `registry:lib` as const
  const path = resolve(ROOT_PATH, LIB_PATH)
  const dir = await readDirectory(path, { withFileTypes: true })
  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.name.endsWith('.ts') || !dirent.isFile())
      continue

    const [name] = dirent.name.split('.ts')
    const kebabName = dirent.name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()
    const filepath = join(path, kebabName)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join(LIB_PATH, kebabName)
    const target = join('~', 'src', 'lib', kebabName)

    const file = {
      path: relativePath,
      // content: source,
      type,
      target,
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

async function crawlComposables() {
  if (skipComposables)
    return []

  /**
   * `hook` is known as composable in Vue with a more fine-grained reactivity system.
   * - https://vuejs.org/guide/reusability/composables.html#what-is-a-composable
   * - https://vuejs.org/guide/reusability/composables.html#vs-react-hooks
   * - https://vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks
   */
  const type = `registry:hook` as const

  const path = resolve(ROOT_PATH, COMPOSABLES_PATH)
  const dir = await readDirectory(path, { withFileTypes: true })
  const registry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.name.endsWith('.ts') || !dirent.isFile())
      continue

    const [name] = dirent.name.split('.ts')
    const kebabName = dirent.name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()
    const filepath = join(path, kebabName)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join(COMPOSABLES_PATH, kebabName)
    const target = join('~', 'src', 'composables', kebabName)

    const file = {
      path: relativePath,
      // content: source,
      type,
      target,
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

  const [ui, components, blocks, lib, composables] = await Promise.all([
    crawlUI(),
    crawlComponents(),
    crawlBlock(),
    crawlLib(),
    crawlComposables(),
  ])

  registry.push(
    ...ui,
    ...components,
    ...blocks,
    ...lib,
    ...composables,
  )

  return registry.sort(
    (a, b) => a.name.localeCompare(b.name),
  )
}

async function runShadcnVueBuild() {
  await Bun.$`bunx --bun shadcn-vue build`
}

export const build = new Command()
  .name('build')
  .description('Build components registry for shadcn-vue-ex.')
  .argument('[registry]', 'path to registry.json file', './registry.json')
  .option(
    '-o, --output <path>',
    'destination directory for json files',
    './public/r',
  )
  .option(
    '--skip-build',
    'skip building registry',
    false,
  )
  .option(
    '--skip-ui',
    'skip building ui',
    false,
  )
  .option(
    '--skip-components',
    'skip building components',
    false,
  )
  .option(
    '--skip-blocks',
    'skip building blocks',
    false,
  )
  .option(
    '--skip-lib',
    'skip building lib',
    false,
  )
  .option(
    '--skip-composables',
    'skip building composables',
    false,
  )
  .action(async (_, opts: BuildCommandOptions) => {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is required to generate registry url')
    }

    // FIXME: some of these skip options does not work properly
    skipBuild = opts.skipBuild
    skipUi = opts.skipUi
    skipComponents = opts.skipComponents
    skipBlocks = opts.skipBlocks
    skipLib = opts.skipLib
    skipComposables = opts.skipComposables

    let items: RegistryItem[]

    try {
      consola.start('Creating registry.json file...')
      items = await buildRegistry()

      const registrySchema = {
        $schema: 'https://shadcn-vue.com/schema/registry.json',
        name: 'shadcn-vue-ex',
        homepage: process.env.VITE_REGISTRY_URL,
        items,
      }

      await writeFile(
        join(ROOT_PATH, 'registry.json'),
        JSON.stringify(registrySchema, null, 2),
      )

      consola.success('Registry created successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }

    if (skipBuild)
      return

    try {
      consola.start('Building registry...')
      await rimraf(REGISTRY_OUTPUT_PATH)
      await buildIndexJson(items)
      await buildThemes()
      await buildStyles()
      await buildIcons()
      await runShadcnVueBuild()
      consola.success('Registry built successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })
