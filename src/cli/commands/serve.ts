import { serve as bunServe } from 'bun'
import { Command } from 'commander'
import { consola } from 'consola'
import process from 'node:process'

interface ServeCommandOptions {
  publicDir: string
  host: string
  port: string
  path: string
}

export const serve = new Command()
  .name('serve')
  .description('Serve registry files locally using Bun.')
  .option(
    '--public-dir [public-dir]',
    'destination directory for json files',
    './public/r',
  )
  .option(
    '-h, --host [host]',
    'hostname to listen on',
    'localhost',
  )
  .option(
    '--port [port]',
    'port to listen on',
    '8080',
  )
  .option(
    '-p, --path [path]',
    'path to registry files',
    '/r',
  )
  .action(async (opts: ServeCommandOptions) => {
    bunServe({
      development: [undefined, null, 'dev', 'development'].includes(process.env.NODE_ENV),
      port: opts.port,
      hostname: opts.host,

      routes: {
        [`${opts.path}/:subdir/:file`]: async (req: any) => {
          const filename = req.params.file
          const subdir = req.params.subdir
          const file = Bun.file(`${opts.publicDir}/${subdir}/${filename}`)
          const fileExists = await file.exists()

          if (!fileExists) {
            console.error(`Registry file not found: ${subdir}/${filename}`)

            return new Response('Not Found', { status: 404 })
          }

          console.log(`Serving ${subdir}/${filename}`)
          const bytes = await file.bytes()

          return new Response(bytes, { headers: { 'Content-Type': 'application/json' } })
        },

        [`${opts.path}/:file`]: async (req: any) => {
          const filename = req.params.file
          const file = Bun.file(`${opts.publicDir}/${filename}`)
          const fileExists = await file.exists()

          if (!fileExists) {
            console.error(`Registry file not found: ${filename}`)

            return new Response('Not Found', { status: 404 })
          }

          console.log(`Serving ${filename}`)
          const bytes = await file.bytes()

          return new Response(bytes, { headers: { 'Content-Type': 'application/json' } })
        },

        '/*': Response.json({ message: 'Unavailable' }, { status: 503 }),
      },

      error(error) {
        console.error(error)

        return new Response('Internal Server Error', { status: 500 })
      },
    })

    consola.box(`Serving registry at http://${opts.host}:${opts.port}${opts.path}`)
  })
