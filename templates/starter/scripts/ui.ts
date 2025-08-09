#!/usr/bin/env bun

import { program } from 'commander'
import { consola } from 'consola'
import process from 'node:process'

const REGISTRY_URL = process.env.REGISTRY_URL || 'http://localhost:8080/r'

async function checkStatus() {
  try {
    await fetch(`${REGISTRY_URL}/index.json`, {
      method: 'OPTIONS',
    })
  }
  catch (error) {
    consola.error(error.message)

    process.exit(1)
  }
}

async function listComponents() {
  try {
    const res = await fetch(`${REGISTRY_URL}/index.json`)

    return await res.json()
  }
  catch (error) {
    consola.error(error.message)

    process.exit(1)
  }
}

program.command('status')
  .description('Check the status of the registry')
  .action(async () => {
    await checkStatus()
    consola.success('Registry is up and running.')
  })

program.command('list')
  .description('List available blocks and components')
  .action(async () => {
    const components = await listComponents()

    consola.log(components.reduce((acc: string, component: any) => {
      acc += `${component.name} `

      return acc
    }, '').trim())
  })

program.command('info')
  .description('Display information about a block or component')
  .argument('<component>', 'the component to display information about')
  .action(async (arg: string) => {
    let res: Response

    try {
      res = await fetch(`${REGISTRY_URL}/${arg}.json`)
    }
    catch (error) {
      consola.error(error)

      process.exit(1)
    }

    if (res.status === 404) {
      consola.error('Component not found')

      process.exit(1)
    }

    const component = await res.json()

    consola.log(JSON.stringify({
      ...component,
      // skip the content key
      files: component.files.map(({ type, path }) => ({ type, path })),
    }, null, 2))
  })

program.command('find')
  .description('Find matching components')
  .argument('<query>', 'the query to search for')
  .action(async (arg: string) => {
    const components = await listComponents()

    consola.log(components.reduce((acc: string, component: any) => {
      if (component.name.includes(arg)) {
        acc += `${component.name} `
      }

      return acc
    }, '').trim())
  })

program.command('add')
  .description('Add a component to your project')
  .argument('<components...>', 'the components to add')
  .option('--first', 'display just the first substring')
  .option('-y, --yes', 'skip confirmation prompt. (default: false)')
  .option('-o, --overwrite', 'overwrite existing files. (default: false)')
  .option('-s, --silent', 'mute output. (default: false)')
  .action(async (components, options) => {
    await checkStatus()

    const urls: string[] = components.reduce((acc: string[], component: string) => {
      acc.push(`${REGISTRY_URL}/${component}.json`)

      return acc
    }, [])

    consola.start('Adding the following components:')
    components.forEach((component) => {
      console.log(`- ${component}`)
    })

    const flags = {
      y: options.yes,
      o: options.overwrite,
      s: options.silent,
    }

    const opts = Object.entries(flags)
      .filter(([_key, value]) => value)
      .map(([key]) => `-${key}`)

    const proc = Bun.spawn(
      ['bunx', '--bun', 'shadcn-vue@latest', 'add', ...opts, ...urls],
      {
        stdin: 'inherit',
        stdout: 'inherit',
        stderr: 'inherit',
      },
    )

    if (!await proc.exited) {
      process.stdout.write('\x1B[1A\x1B[K')
      consola.success('Done!')
    }
  })

program.parse()
