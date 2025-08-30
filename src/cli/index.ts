#!/usr/bin/env bun

import { Command } from 'commander'
import packageJson from '../../package.json'
import { build } from './commands/build'
import { serve } from './commands/serve'

async function main() {
  const program = new Command()
    .name('bun registry')
    .description('Command line interface for bun-vue registry.')
    .version(
      packageJson.version,
      '-v, --version',
      'display the version number',
    )

  program
    .addCommand(build)
    .addCommand(serve)

  program.parse()
}

main()
