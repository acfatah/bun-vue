import { join } from 'pathe'
import type {
  RegistryItem,
  RegistryItemCss,
  RegistryItemCssVars,
} from '../../../registry/schema'
import { UI_PATH } from '.'
import { parseComment, readDirectory, readFile } from '../../utils'
import { getFileDependencies } from './get-file-dependecies'

export async function buildUIRegistry(componentPath: string, componentName: string) {
  const dir = await readDirectory(componentPath, {
    withFileTypes: true,
  })

  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const type = 'registry:ui'
  let title = ''
  let description = ''
  let cssVars: RegistryItemCssVars | undefined
  let css: RegistryItemCss | undefined

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    const filepath = join(componentPath, dirent.name)
    const relativePath = join(UI_PATH, componentName, dirent.name)
    const source = await readFile(filepath, { encoding: 'utf8' })

    if (dirent.name === 'metadata.ts') {
      const { metadata } = await import(filepath) as { metadata: RegistryItem }

      title = metadata?.title || title
      description = metadata?.description || description
      cssVars = metadata?.cssVars ?? cssVars
      css = metadata?.css ?? css

      if (metadata?.files) {
        files.push(...metadata.files)
      }

      if (metadata?.registryDependencies) {
        metadata.registryDependencies.forEach(dep => registryDependencies.add(dep))
      }

      if (metadata?.dependencies) {
        metadata.dependencies.forEach(dep => dependencies.add(dep))
      }

      continue
    }
    else {
      files.push({ path: relativePath, type })
    }

    // parse title and description from block comment in index.ts
    if (dirent.name === 'index.ts' && !title && !description) {
      [title, description] = await parseComment(filepath)

      continue
    }

    const deps = await getFileDependencies(filepath, source)
    deps.dependencies.forEach(dep => dependencies.add(dep))
    deps.registryDependencies.forEach(dep => registryDependencies.add(dep))
  }

  return {
    name: componentName,
    type,
    title,
    description,
    files,
    ...(cssVars && { cssVars }),
    ...(css && { css }),
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}
