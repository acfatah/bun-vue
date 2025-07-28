#!/usr/bin/env bun

import { serve } from 'bun'
import minimist from 'minimist'
import process from 'node:process'

const argv = minimist(process.argv.slice(2))
const PORT = process.env.PORT || argv.p || argv.port || 3000
const HOST = process.env.HOST || argv.h || argv.host || 'localhost'

serve({
  development: [undefined, null, 'dev', 'development'].includes(process.env.NODE_ENV),
  port: PORT,
  hostname: HOST,

  routes: {
    '/r/:file': async (req) => {
      const filename = req.params.file
      const file = Bun.file(`./public/r/${filename}`)
      const fileExists = await file.exists()
      const bytes = await file.bytes()

      if (!fileExists) {
        console.error(`Registry file not found: ${filename}`)

        return new Response('Not Found', { status: 404 })
      }

      console.log(`Serving ${filename}`)

      return new Response(bytes, { headers: { 'Content-Type': 'application/json' } })
    },

    '/*': Response.json({ message: 'Unavailable' }, { status: 503 }),
  },

  error(error) {
    console.error(error)

    return new Response('Internal Server Error', { status: 500 })
  },
})

console.log(`Listening on http://${HOST}:${PORT}`)
