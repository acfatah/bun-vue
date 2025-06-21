<script setup lang="ts">
import ComponentWrapper from '../components/ComponentWrapper.vue'

import AccordionDemo from '../registry/examples/AccordionDemo.vue'
import AlertDemo from '../registry/examples/AlertDemo.vue'
import AlertDialogDemo from '../registry/examples/AlertDialogDemo.vue'
import AspectRatioDemo from '../registry/examples/AspectRatioDemo.vue'
import AvatarDemo from '../registry/examples/AvatarDemo.vue'
import BadgeDemo from '../registry/examples/BadgeDemo.vue'
import BreadcrumbCollapsed from '../registry/examples/BreadcrumbCollapsed.vue'
import BreadcrumbDemo from '../registry/examples/BreadcrumbDemo.vue'
import BreadcrumbLinkComponent from '../registry/examples/BreadcrumbLinkComponent.vue'
import BreadcrumbResponsive from '../registry/examples/BreadcrumbResponsive.vue'
import BreadcrumbWithSeparator from '../registry/examples/BreadcrumbWithSeparator.vue'
import ButtonDestructive from '../registry/examples/ButtonDestructive.vue'
import ButtonGhost from '../registry/examples/ButtonGhost.vue'
import ButtonIcon from '../registry/examples/ButtonIcon.vue'
import ButtonLink from '../registry/examples/ButtonLink.vue'
import ButtonLoading from '../registry/examples/ButtonLoading.vue'
import ButtonOutline from '../registry/examples/ButtonOutline.vue'
import ButtonPrimary from '../registry/examples/ButtonPrimary.vue'
import ButtonSecondary from '../registry/examples/ButtonSecondary.vue'
import ButtonsLarge from '../registry/examples/ButtonsLarge.vue'
import ButtonsSmall from '../registry/examples/ButtonsSmall.vue'
import ButtonWithIcon from '../registry/examples/ButtonWithIcon.vue'
import ButtonWithIconRight from '../registry/examples/ButtonWithIconRight.vue'
import CalendarDemo from '../registry/examples/CalendarDemo.vue'
import CalendarDemo1 from '../registry/examples/CalendarDemo1.vue'
import CardDemo from '../registry/examples/CardDemo.vue'
import CardsDemo from '../registry/examples/CardsDemo.vue'
import CardWithForm from '../registry/examples/CardWithForm.vue'
import CarouselDemo from '../registry/examples/CarouselDemo.vue'
import SelectDemo from '../registry/examples/SelectDemo.vue'
import SelectForm from '../registry/examples/SelectForm.vue'
import SelectScrollable from '../registry/examples/SelectScrollable.vue'
</script>

<template>
  <main
    class="
      container-wrapper px-6
      3xl:fixed:px-0
    "
  >
    <div
      class="
        flex flex-col gap-4
        3xl:fixed:container
      "
    >
      <ComponentWrapper name="Accordion">
        <div class="grid w-full max-w-xl gap-4">
          <AccordionDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Alert">
        <div class="grid w-full max-w-xl gap-4">
          <AlertDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Alert Dialog">
        <div class="grid w-full max-w-xl gap-4">
          <AlertDialogDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Aspect Ratio">
        <div class="grid w-full max-w-xl gap-4">
          <AspectRatioDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Avatar">
        <div class="grid w-full max-w-xl gap-4">
          <AvatarDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Badge">
        <div class="grid w-full max-w-xl gap-4">
          <BadgeDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Breadcrumb">
        <div class="grid w-full max-w-xl gap-4">
          <BreadcrumbDemo />
        </div>
        <div class="grid w-full max-w-xl gap-4">
          <BreadcrumbWithSeparator />
        </div>
        <div class="grid w-full gap-4">
          <BreadcrumbCollapsed />
        </div>
        <div class="grid w-full max-w-xl gap-4">
          <BreadcrumbLinkComponent />
        </div>
        <div class="grid w-full max-w-xl gap-4">
          <BreadcrumbResponsive />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Button">
        <div class="flex flex-col gap-6">
          <div
            class="
              flex flex-wrap items-center gap-2
              md:flex-row
            "
          >
            <ButtonPrimary />
            <ButtonSecondary />
            <ButtonDestructive />
            <ButtonOutline />
            <ButtonGhost />
            <ButtonLink />
            <ButtonIcon />
            <ButtonWithIcon />
            <ButtonWithIconRight />
            <ButtonLoading />
          </div>
        </div>
        <ButtonsSmall />
        <ButtonsLarge />
      </ComponentWrapper>

      <ComponentWrapper name="Calendar">
        <div class="grid w-full max-w-xl gap-4">
          <CalendarDemo />
        </div>

        <div class="grid w-full max-w-xl gap-4">
          <CalendarDemo1 />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Select">
        <div class="flex w-full max-w-xl flex-col gap-6">
          <div class="grid w-full gap-4">
            <SelectDemo />
            <SelectScrollable />
          </div>

          <div class="grid w-full gap-4 rounded border p-4">
            <SelectForm />
          </div>
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Card">
        <div class="flex w-full flex-col gap-6 p-0">
          <CardDemo />
          <CardWithForm />
          <CardsDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Carousel">
        <div class="grid w-full">
          <CarouselDemo />
        </div>
      </ComponentWrapper>
    </div>
  </main>
</template>
