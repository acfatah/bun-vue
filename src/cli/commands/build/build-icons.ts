import { join } from 'pathe'
import { REGISTRY_OUTPUT_PATH } from '.'
import { icons } from '../../../registry/registry-icons'
import { writeFile } from '../../utils'

export async function buildIcons() {
  await writeFile(
    join(REGISTRY_OUTPUT_PATH, 'icons', 'index.json'),
    JSON.stringify(icons, null, 2),
  )
}
