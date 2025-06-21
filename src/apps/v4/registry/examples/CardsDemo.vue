<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <div
    class="
      flex w-full flex-col flex-wrap items-start gap-8
      md:flex-row md:*:data-[slot=card]:basis-1/4
    "
  >
    <Card class="w-sm">
      <CardContent class="text-sm">
        Content Only
      </CardContent>
    </Card>
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Header Only</CardTitle>
        <CardDescription>
          This is a card with a header and a description.
        </CardDescription>
      </CardHeader>
    </Card>
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Header and Content</CardTitle>
        <CardDescription>
          This is a card with a header and a content.
        </CardDescription>
      </CardHeader>
      <CardContent class="text-sm">
        Content
      </CardContent>
    </Card>
    <Card class="w-sm">
      <CardFooter class="text-sm">
        Footer Only
      </CardFooter>
    </Card>
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Header + Footer</CardTitle>
        <CardDescription>
          This is a card with a header and a footer.
        </CardDescription>
      </CardHeader>
      <CardFooter class="text-sm">
        Footer
      </CardFooter>
    </Card>
    <Card class="w-sm">
      <CardContent class="text-sm">
        Content
      </CardContent>
      <CardFooter class="text-sm">
        Footer
      </CardFooter>
    </Card>
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Header + Footer</CardTitle>
        <CardDescription>
          This is a card with a header, a content and a footer.
        </CardDescription>
      </CardHeader>
      <CardContent class="text-sm">
        Content
      </CardContent>
      <CardFooter class="text-sm">
        Footer
      </CardFooter>
    </Card>
  </div>
</template>
