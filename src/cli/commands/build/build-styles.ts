import { join } from 'pathe'
import { REGISTRY_OUTPUT_PATH } from '.'
import { writeFile } from '../../utils'

export async function buildStyles() {
  const styles = [
    {
      name: 'new-york',
      label: 'New York',
    },
    {
      name: 'default',
      label: 'Default',
    },
  ]

  await writeFile(
    join(REGISTRY_OUTPUT_PATH, 'styles', 'index.json'),
    JSON.stringify(styles, null, 2),

  )
}
