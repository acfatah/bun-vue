#!/usr/bin/env bun

import { program } from 'commander'
import { consola } from 'consola'
import process from 'node:process'

const REGISTRY_URL = process.env.REGISTRY_URL || 'http://localhost:8080'

program.command('add')
  .description('add a component to your project')
  .argument('<components...>', 'the components to add')
  .option('--first', 'display just the first substring')
  .option('-y, --yes', 'skip confirmation prompt. (default: false)')
  .option('-o, --overwrite', 'overwrite existing files. (default: false)')
  .option('-s, --silent', 'mute output. (default: false)')
  .action(async (components, options) => {
    const urls: string[] = components.reduce((acc: string[], component: string) => {
      acc.push(`${REGISTRY_URL}/r/${component}.json`)

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
        stdout: 'inherit',
        stderr: 'inherit',
      },
    )
    await proc.exited || consola.success('Done!')
  })

program.parse()
