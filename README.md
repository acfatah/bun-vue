<div align="center">
  <a href="https://bun.sh"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/bun_js.png" alt="Bun.js" title="Bun.js"/></a>
  <a href="https://www.typescriptlang.org"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></a>
  <a href="https://vueuse.org"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vue_js.png" alt="Vue.js" title="Vue.js"/></a>
  <a href="https://tailwindcss.com/"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" alt="Tailwind CSS" title="Tailwind CSS"/></a>
</div>

<div align="center">
  <h1>Bun + TypeScript + Vue + Tailwind CSS</h1>

  <p class="flex gap-1">
    <a href="https://github.com/acfatah/bun-vue/commits/main">
      <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/acfatah/bun-vue?style=flat-square"
    ></a>
    <img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/acfatah/bun-vue?display_timestamp=committer&style=flat-square">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/acfatah/bun-vue?style=flat-square">
  </p>
</div>

Registry for [`shadcn/ui`](https://ui.shadcn.com), implemented using Ark UI, specifically built using `Bun`, `TypeScript` and `Vue 3`.

> [!IMPORTANT]
> Active development in progress!

## Starter Template

`mkdir` your project name, `cd` to it then run,

```bash
bunx --bun tiged acfatah/bun-vue/templates/starter && bun update
```

## Development

### Serving Registry

> [!IMPORTANT]
> You need to build the component registry first by running `bun cli build`.

```bash
bun cli serve
```

To list available blocks and components, run:

```bash
bun ui list
```

To add a block or component, let say basic login form block, simply run `bun add login-basic`. The
block registry resides under `src/registry/blocks/login-basic`.

### Post-install Scripts

By default, `bun` will block all post-install scripts. Currently there are two scripts required which are:

- `@tailwindcss/oxide` used by Tailwind
- `maplibre-gl` used by Unovis

To list them, run

```bash
bun pm unstrusted
```

To execute them, run

```bash
bun pm trust --all
```

or specify the package name one by one.
