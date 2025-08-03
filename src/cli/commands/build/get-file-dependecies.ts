import process from 'node:process'
import { parseSync } from 'oxc-parser'
import { compileScript, parse } from 'vue/compiler-sfc'

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
  ['@iconify/vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['@vueuse/core', []],
  ['clsx', []],
  ['embla-carousel-vue', []],
  ['reka-ui', []],
  ['tailwind-merge', []],
  ['vaul-vue', []],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
  ['vue-sonner', []],
])

const REGISTRY_DEPENDENCY = '@/'

export async function getFileDependencies(filename: string, sourceCode: string) {
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

    if (source?.startsWith(REGISTRY_DEPENDENCY) && !source.endsWith('.vue')) {
      const componentName = source.split('/').slice(-1)[0]
      const kebabName = componentName.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()
      const registryUrl = `${process.env.VITE_REGISTRY_URL}/r/${kebabName}.json`

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
