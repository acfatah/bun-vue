import { template } from 'es-toolkit/compat'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { join } from 'pathe'
import { REGISTRY_OUTPUT_PATH } from '.'
import { baseColors, baseColorsV4 } from '../../../registry/registry-base-colors'
import { colorMapping, colors } from '../../../registry/registry-colors'
import { rimraf, writeFile } from '../../utils'

const BASE_COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone']

/**
 * Build registry/colors/index.json.
 */
export async function buildThemes() {
  const colorsTargetPath = join(REGISTRY_OUTPUT_PATH, 'colors')

  await rimraf(colorsTargetPath)

  if (!existsSync(colorsTargetPath)) {
    await fs.mkdir(colorsTargetPath, { recursive: true })
  }

  const colorsData: Record<string, any> = {}
  for (const [color, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      colorsData[color] = value
      continue
    }

    if (Array.isArray(value)) {
      colorsData[color] = value.map(item => ({
        ...item,
        rgbChannel: item.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, '$1 $2 $3'),
        hslChannel: item.hsl.replace(
          /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
          '$1 $2 $3',
        ),
      }))
      continue
    }

    if (typeof value === 'object') {
      colorsData[color] = {
        ...value,
        rgbChannel: value.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, '$1 $2 $3'),
        hslChannel: value.hsl.replace(
          /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
          '$1 $2 $3',
        ),
      }
      continue
    }
  }

  await writeFile(
    join(colorsTargetPath, 'index.json'),
    JSON.stringify(colorsData, null, 2),

  )

  /**
   * Build registry/colors/[base].json.
   */
  const BASE_STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;
  `

  const BASE_STYLES_WITH_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: 0.5rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`

  for (const baseColor of BASE_COLORS) {
    const base: Record<string, any> = {
      inlineColors: {},
      cssVars: {},
    }
    for (const [mode, values] of Object.entries(colorMapping)) {
      base.inlineColors[mode] = {}
      base.cssVars[mode] = {}
      for (const [key, value] of Object.entries(values)) {
        if (typeof value === 'string') {
          // Chart colors do not have a 1-to-1 mapping with tailwind colors.
          if (key.startsWith('chart-')) {
            base.cssVars[mode][key] = value
            continue
          }

          const resolvedColor = value.replace(/\{\{base\}\}-/g, `${baseColor}-`)
          base.inlineColors[mode][key] = resolvedColor

          const [resolvedBase, scale] = resolvedColor.split('-')
          const color = scale
            ? colorsData[resolvedBase].find(
                (item: any) => item.scale === Number.parseInt(scale),
              )
            : colorsData[resolvedBase]
          if (color) {
            base.cssVars[mode][key] = color.hslChannel
          }
        }
      }
    }

    // Add v4 css vars.
    base.cssVarsV4 = baseColorsV4[baseColor as keyof typeof baseColorsV4]

    // Build css vars.
    base.inlineColorsTemplate = template(BASE_STYLES)({})
    base.cssVarsTemplate = template(BASE_STYLES_WITH_VARIABLES)({
      colors: base.cssVars,
    })

    await writeFile(
      join(REGISTRY_OUTPUT_PATH, `colors/${baseColor}.json`),
      JSON.stringify(base, null, 2),
    )

    // ----------------------------------------------------------------------------
    // Build registry/themes.css
    // ----------------------------------------------------------------------------
    const THEME_STYLES_WITH_VARIABLES = `
.theme-<%- theme %> {
  --background: <%- colors.light["background"] %>;
  --foreground: <%- colors.light["foreground"] %>;

  --muted: <%- colors.light["muted"] %>;
  --muted-foreground: <%- colors.light["muted-foreground"] %>;

  --popover: <%- colors.light["popover"] %>;
  --popover-foreground: <%- colors.light["popover-foreground"] %>;

  --card: <%- colors.light["card"] %>;
  --card-foreground: <%- colors.light["card-foreground"] %>;

  --border: <%- colors.light["border"] %>;
  --input: <%- colors.light["input"] %>;

  --primary: <%- colors.light["primary"] %>;
  --primary-foreground: <%- colors.light["primary-foreground"] %>;

  --secondary: <%- colors.light["secondary"] %>;
  --secondary-foreground: <%- colors.light["secondary-foreground"] %>;

  --accent: <%- colors.light["accent"] %>;
  --accent-foreground: <%- colors.light["accent-foreground"] %>;

  --destructive: <%- colors.light["destructive"] %>;
  --destructive-foreground: <%- colors.light["destructive-foreground"] %>;

  --ring: <%- colors.light["ring"] %>;

  --radius: <%- colors.light["radius"] %>;
}

.dark .theme-<%- theme %> {
  --background: <%- colors.dark["background"] %>;
  --foreground: <%- colors.dark["foreground"] %>;

  --muted: <%- colors.dark["muted"] %>;
  --muted-foreground: <%- colors.dark["muted-foreground"] %>;

  --popover: <%- colors.dark["popover"] %>;
  --popover-foreground: <%- colors.dark["popover-foreground"] %>;

  --card: <%- colors.dark["card"] %>;
  --card-foreground: <%- colors.dark["card-foreground"] %>;

  --border: <%- colors.dark["border"] %>;
  --input: <%- colors.dark["input"] %>;

  --primary: <%- colors.dark["primary"] %>;
  --primary-foreground: <%- colors.dark["primary-foreground"] %>;

  --secondary: <%- colors.dark["secondary"] %>;
  --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;

  --accent: <%- colors.dark["accent"] %>;
  --accent-foreground: <%- colors.dark["accent-foreground"] %>;

  --destructive: <%- colors.dark["destructive"] %>;
  --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;

  --ring: <%- colors.dark["ring"] %>;
}`

    const themeCSS = []
    for (const theme of baseColors) {
      themeCSS.push(
        template(THEME_STYLES_WITH_VARIABLES)({
          colors: theme.cssVars,
          theme: theme.name,
        }),
      )
    }

    await writeFile(
      join(REGISTRY_OUTPUT_PATH, `themes.css`),
      themeCSS.join('\n'),
    )

    /**
     * Build registry/themes/[theme].json
     */
    await rimraf(join(REGISTRY_OUTPUT_PATH, 'themes'))
    for (const baseColor of BASE_COLORS) {
      const payload: Record<string, any> = {
        name: baseColor,
        label: baseColor.charAt(0).toUpperCase() + baseColor.slice(1),
        cssVars: {},
      }

      for (const [mode, values] of Object.entries(colorMapping)) {
        payload.cssVars[mode] = {}
        for (const [key, value] of Object.entries(values)) {
          if (typeof value === 'string') {
            const resolvedColor = value.replace(/\{\{base\}\}-/g, `${baseColor}-`)
            payload.cssVars[mode][key] = resolvedColor

            const [resolvedBase, scale] = resolvedColor.split('-')
            const color = scale
              ? colorsData[resolvedBase].find(
                  (item: any) => item.scale === Number.parseInt(scale),
                )
              : colorsData[resolvedBase]
            if (color) {
              payload.cssVars[mode][key] = color.hslChannel
            }
          }
        }
      }

      const targetPath = join(REGISTRY_OUTPUT_PATH, 'themes')

      // Create directory if it doesn't exist.
      if (!existsSync(targetPath)) {
        await fs.mkdir(targetPath, { recursive: true })
      }

      await writeFile(
        join(targetPath, `${payload.name}.json`),
        JSON.stringify(payload, null, 2),
      )
    }
  }
}
