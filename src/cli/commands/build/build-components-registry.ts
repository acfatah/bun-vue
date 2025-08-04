import { join } from 'pathe'
import type {
  RegistryItem,
} from '../../../registry/schema'
import { COMPONENTS_PATH } from '.'
import { readFile } from '../../utils'
import { getFileDependencies } from './get-file-dependecies'

export async function buildComponentsRegistry(componentName: string) {
  const type = `registry:component` as const
  const filepath = join(COMPONENTS_PATH, componentName)
  const source = await readFile(filepath, { encoding: 'utf8' })
  const target = join('~', 'src', 'components', componentName)
  const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)
  const [name] = componentName.split('.vue')
  const kebabName = name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()

  return {
    name: kebabName,
    type,
    files: [
      {
        path: filepath,
        type,
        target,
      },
    ],
    registryDependencies: Array.from(registryDependencies),
    dependencies: Array.from(dependencies),
  } satisfies RegistryItem
}
