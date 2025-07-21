import Bun from 'bun'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseSync } from 'oxc-parser'
import { join, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'

interface RegistryItem {
  name: string
  type: string
  files: {
    path: string
    type: string
  }[]
  registryDependencies: string[]
  dependencies: string[]
}

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
// const CATEGORIES = ['authentication', 'sidebar', 'login', 'dashboard']

async function readFile(filepath: string, _options = {}) {
  const file = await Bun.file(filepath)

  return file.text()
}

async function readDirectory(
  path: string,
  options: { recursive?: boolean, withFileTypes?: boolean, encoding?: string } = {},
) {
  if (!existsSync(path)) {
    console.error(`The directory ${path} does not exist.`)

    return []
  }

  // @ts-expect-error ignore readdir options type
  return readdir(path, options)
}

// function getCategory(text: string) {
//   return CATEGORIES.find(category => category === text.replace(/\d+/g, '').toLowerCase()) || undefined
// }

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

  const files: { path: string, type: string }[] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join('src', 'ui', 'components', componentName, dirent.name)
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

export async function buildRegistry() {
  const registry: RegistryItem[] = []

  const uiPath = resolve('src', 'components', 'ui')
  // const examplePath = resolve('src', 'components', 'examples')
  // const blockPath = resolve('src', 'components', 'blocks')
  // const hookPath = resolve('src', 'components', 'hook')

  // const [ui, example, block] = await Promise.all([
  const [ui] = await Promise.all([
    crawlUI(uiPath),
    // crawlExample(examplePath),
    // crawlBlock(blockPath),
    // crawlHook(hookPath),
  ])

  // registry.push(...ui, ...example, ...block)
  registry.push(...ui)

  return registry
}

try {
  const items = await buildRegistry()

  const schema = {
    $schema: 'https://shadcn-vue.com/schema/registry.json',
    name: 'shadcn-vue-ex',
    homepage: 'https://acme.com',
    items,
  }

  await writeFile(
    path.join(ROOT_PATH, 'registry.json'),
    JSON.stringify(schema, null, 2),
  )
}
catch (error) {
  console.error(error)
  process.exit(1)
}
