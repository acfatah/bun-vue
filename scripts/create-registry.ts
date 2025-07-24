import Bun from 'bun'
import { consola } from 'consola'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseSync } from 'oxc-parser'
import { join, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'
import type { Registry, RegistryFiles } from '../src/registry/schema'

type ArrayItem<T> = T extends Array<infer X> ? X : never
type RegistryItem = ArrayItem<Registry>

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

  const populateDeps = (source: string) => {
    const peerDeps = DEPENDENCIES.get(source)
    // const taggedDeps = DEPENDENCIES_WITH_TAGS.get(source)
    if (peerDeps !== undefined) {
      // if (taggedDeps !== undefined)
      //   dependencies.add(taggedDeps)
      // else
      dependencies.add(source)
      peerDeps.forEach(dep => dependencies.add(dep))
    }

    if (source.startsWith(REGISTRY_DEPENDENCY) && !source.endsWith('.vue')) {
      const component = source.split('/').slice(-1)[0]
      if (component !== 'utils')
        registryDependencies.add(component)
    }
  }

  if (filename.endsWith('.ts')) {
    const ast = parseSync(filename, sourceCode, {
      sourceType: 'module',
    })

    const sources = ast.program.body.filter((i: any) => i.type === 'ImportDeclaration').map((i: any) => i.source)
    sources.forEach((source: any) => {
      populateDeps(source.value)
    })
  }
  else {
    const parsed = parse(sourceCode, { filename })
    if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
      const compiled = compileScript(parsed.descriptor, { id: 'id' })

      Object.values(compiled.imports!).forEach((value) => {
        populateDeps(value.source)
      })
    }
  }

  return { registryDependencies, dependencies }
}

async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = await readDirectory(componentPath, {
    withFileTypes: true,
  })

  const files: RegistryFiles[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('src', 'components', 'ui', componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })

    files.push({ path: relativePath, type })

    // only grab deps from the vue files
    if (dirent.name === 'index.ts')
      continue

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: componentName,
    type,
    files,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}

async function crawlUI(rootPath: string) {
  const dir = await readDirectory(rootPath, { recursive: true, withFileTypes: true })
  const uiRegistry: Registry = []

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
  const dir = await readDirectory(blockPath, { withFileTypes: true, recursive: true })

  const files: RegistryFiles[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const isPage = dirent.name === 'Page.vue'
    const type = isPage ? 'registry:page' : 'registry:component'

    const compPath = isPage ? dirent.name : `components/${dirent.name}`
    const filepath = join(blockPath, compPath)
    const relativePath = join('blocks', blockName, compPath)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = isPage ? `pages/dashboard/index.vue` : ''

    files.push({ content: source, path: relativePath, type, target })

    const deps = await getFileDependencies(filepath, source)
    if (!deps)
      continue

    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    type: 'registry:block',
    files,
    name: blockName,
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
    category: getCategory(blockName),
  } satisfies RegistryItem
}

async function crawlBlock(rootPath: string) {
  const type = `registry:block` as const
  const dir = await readDirectory(rootPath, { withFileTypes: true })
  const registry: Registry = []

  for (const dirent of dir) {
    if (!dirent.isFile()) {
      const result = await buildBlockRegistry(
        `${rootPath}/${dirent.name}`,
        dirent.name,
      )

      if (result.files.length) {
        registry.push(result)
      }

      continue
    }

    if (!dirent.name.endsWith('.vue') || !dirent.isFile())
      continue

    const [name] = dirent.name.split('.vue')

    const filepath = join(rootPath, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const relativePath = join('blocks', dirent.name)

    const target = 'pages/dashboard/index.vue'

    const file = {
      name: dirent.name,
      content: source,
      path: relativePath,
      target,
      type,
    }
    const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)

    registry.push({
      name,
      type,
      files: [file],
      registryDependencies: Array.from(registryDependencies),
      dependencies: Array.from(dependencies),
      category: getCategory(name),
    })
  }

  return registry
}

export async function buildRegistry() {
  const registry: Registry = []
  const registryPath = resolve('src', 'components')

  const uiPath = resolve(registryPath, 'ui')
  const blockPath = resolve(registryPath, 'blocks')
  // const hookPath = resolve(registryPath, 'hook')

  const [ui, block] = await Promise.all([
    crawlUI(uiPath),
    crawlBlock(blockPath),
    // crawlHook(hookPath),
  ])

  registry.push(...ui, ...block)

  return registry
}

async function main() {
  try {
    consola.start('Creating registry.json file...')
    const items = await buildRegistry()

    const registrySchema = {
      $schema: 'https://shadcn-vue.com/schema/registry.json',
      name: 'shadcn-vue-ex',
      homepage: 'https://acme.com',
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

  try {
    consola.start('Building registry...')
    await Bun.$`bunx --bun shadcn-vue build`
    consola.success('Registry built successfully.')
  }
  catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

main()
