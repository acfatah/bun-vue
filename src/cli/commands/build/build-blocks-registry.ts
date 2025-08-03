import { join } from 'pathe'
import type {
  RegistryItem,
} from '../../../registry/schema'
import { BLOCKS_PATH } from '.'
import { readFile } from '../../utils'
import { getFileDependencies } from './get-file-dependecies'

const CATEGORIES = ['authentication', 'sidebar', 'login', 'dashboard']

function getCategory(text: string) {
  // Remove all numbers from the string and convert it to lower case
  return CATEGORIES.find(category => category === text.replace(/\d+/g, '').toLowerCase()) || undefined
}

export async function buildBlocksRegistry(blockPath: string, blockName: string) {
  const files: RegistryItem['files'] = []
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const metadata: RegistryItem = (await import(`${blockPath}/metadata.ts`)).metadata

  if (!metadata) {
    console.warn(`No registry item found for ${blockPath}`)

    return
  }

  for (const item of metadata.files ?? []) {
    const { path, type, target: _target } = item
    const filepath = join(blockPath, path)
    const relativePath = join(BLOCKS_PATH, blockName, path)
    const source = await readFile(filepath, { encoding: 'utf8' })
    const target = _target && join('~', _target)

    if (type === 'registry:page' || type === 'registry:file') {
      files.push({ path: relativePath, type, target: target as string })
    }
    else {
      files.push({ path: relativePath, type, target: target as string | undefined })
    }

    // Skip non-vue files
    if (!item.path.endsWith('.vue'))
      continue

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
