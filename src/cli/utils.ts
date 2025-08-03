import Bun from 'bun'
import consola from 'consola'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { parseSync } from 'oxc-parser'

export async function readFile(filepath: string, _options = {}) {
  const file = Bun.file(filepath)

  return await file.text()
}

export async function readDirectory(
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

export async function writeFile(path: string, payload: any) {
  Bun.write(path, payload)
}

export async function removeFile(filename: string) {
  const file = Bun.file(filename)

  if (await file.exists()) {
    await Bun.$`rm ${filename}`
  }
}

export async function parseComment(filename: string) {
  const file = Bun.file(filename)
  const code = await file.text()
  const result = parseSync(filename, code)

  // Read the first line block comment in the index.ts file only
  if (!result.comments.length || result.comments[0]?.type !== 'Block' || result.comments[0]?.start !== 0)
    return ['', '']

  const lines = result.comments[0]?.value.split('\n')

  // The first line is the title
  const title = lines[1].trim().replace('* ', '')

  // The third line until the end is the description
  const description = lines.slice(3).reduce(
    (acc, line) => `${acc + line.replace('* ', '')}`,
    '',
  ).trim()

  // TODO: parse the description as markdown

  return [title, description]
}
