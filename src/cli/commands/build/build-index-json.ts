import path from 'node:path'
import type {
  RegistryItem,
} from '../../../registry/schema'
import { REGISTRY_OUTPUT_PATH } from '.'
import { writeFile } from '../../utils'

export async function buildIndexJson(registryItems: RegistryItem[]) {
  const sortedRegistryItems = registryItems.sort((a, b) => a.name.localeCompare(b.name))
  const items = sortedRegistryItems.map((item) => {
    return {
      ...item,
      files: item.files?.map(_file => ({
        path: _file.path,
        type: item.type,
      })),
    }
  })

  await writeFile(
    path.join(REGISTRY_OUTPUT_PATH, 'index.json'),
    JSON.stringify(items, null, 2),
  )
}
