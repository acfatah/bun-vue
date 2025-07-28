<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const isDesktop = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <a href="#/">
            Home
          </a>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem v-if="isDesktop">
        <BreadcrumbLink as-child>
          <a href="#/">
            Visible on Desktop
          </a>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem v-else>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <a href="#/docs/components/accordion.html">
            Components
          </a>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
