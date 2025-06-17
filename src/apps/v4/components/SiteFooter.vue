<template>
  <footer
    class="
      group-has-[.section-soft]/body:bg-surface/40
      dark:bg-transparent
      3xl:fixed:bg-transparent
    "
  >
    <div
      class="
        container-wrapper px-4
        xl:px-6
      "
    >
      <div class="flex h-(--footer-height) items-center justify-between">
        <div
          class="
            w-full text-center text-xs leading-loose text-muted-foreground
            sm:text-sm
          "
        >
          <span>
            Built by <a
              href="https://twitter.com/shadcn" target="_blank" class="
                font-medium underline underline-offset-4
              "
            > shadcn</a>.
          </span>

          <span class="ml-1 inline-block">
            Ported to Vue by <a
              href="https://github.com/unovue" target="_blank" class="
                font-medium underline underline-offset-4
              "
            > unovue </a>.
          </span>

          <span class="ml-1 inline-block">
            The code source is available on <a
              href="https://github.com/unovue/shadcn-vue" target="_blank" class="
                font-medium underline underline-offset-4
              "
            > GitHub</a>.
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
