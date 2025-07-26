# `shadcn-vue` Boilerplate

<p class="flex gap-1">
  <a href="https://github.com/acfatah/shadcn-vue/commits/main">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/acfatah/shadcn-vue?style=flat-square"
  ></a>
  <img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/acfatah/shadcn-vue?display_timestamp=committer&style=flat-square">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/acfatah/shadcn-vue?style=flat-square">
</p>

Boilerplate to start building `shadcn-ui` Vue front-end Single Page Application
(SPA) in minutes with `TypeScript` and `Bun`.

> [!IMPORTANT]
> WORK IN PROGRESS

## Starter Templates

`mkdir` your project name, `cd` to it then run,

```bash
bunx --bun tiged acfatah/shadcn-vue-ex/templates/starter && bun update
```

## Post-install Scripts

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
