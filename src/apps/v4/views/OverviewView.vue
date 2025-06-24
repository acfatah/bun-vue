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
import CheckboxWithForm from '../registry/examples/CheckboxWithForm.vue'
import CollapsibleDemo from '../registry/examples/CollapsibleDemo.vue'
import ComboboxDemo1 from '../registry/examples/ComboboxDemo1.vue'
import ComboboxDemo2 from '../registry/examples/ComboboxDemo2.vue'
import ComboboxDemo3 from '../registry/examples/ComboboxDemo3.vue'
import ComboboxDemo4 from '../registry/examples/ComboboxDemo4.vue'
import CommandDemo from '../registry/examples/CommandDemo.vue'
import CommandWithDialog from '../registry/examples/CommandWithDialog.vue'
import ContextMenuDemo from '../registry/examples/ContextMenuDemo.vue'
import DatePickerDemo1 from '../registry/examples/DatePickerDemo1.vue'
import DatePickerDemo2 from '../registry/examples/DatePickerDemo2.vue'
import DatePickerDemo3 from '../registry/examples/DatePickerDemo3.vue'
import DatePickerWithForm from '../registry/examples/DatePickerWithForm.vue'
import DialogWithContextMenuTrigger from '../registry/examples/DialogWithContextMenuTrigger.vue'
import DialogWithCustomCloseButton from '../registry/examples/DialogWithCustomCloseButton.vue'
import DialogWithForm from '../registry/examples/DialogWithForm.vue'
import DialogWithInlineInputs from '../registry/examples/DialogWithInlineInputs.vue'
import DialogWithScrollableContent from '../registry/examples/DialogWithScrollableContent.vue'
import DialogWithScrollableOverlay from '../registry/examples/DialogWithScrollableOverlay.vue'
import DialogWithStickyFooter from '../registry/examples/DialogWithStickyFooter.vue'
import DrawerDemo from '../registry/examples/DrawerDemo.vue'
import DrawerResponsiveForm from '../registry/examples/DrawerResponsiveForm.vue'
import DrawerWithScrollableContent from '../registry/examples/DrawerWithScrollableContent.vue'
import DropdownDemo from '../registry/examples/DropdownDemo.vue'
import DropdownMenu from '../registry/examples/DropdownMenu.vue'
import DropdownMenuAvatarOnly from '../registry/examples/DropdownMenuAvatarOnly.vue'
import DropdownMenuIconButton from '../registry/examples/DropdownMenuIconButton.vue'
import DropdownMenuWithAvatar from '../registry/examples/DropdownMenuWithAvatar.vue'
import DropdownWithCheckboxes from '../registry/examples/DropdownWithCheckboxes.vue'
import DropdownWithRadioGroup from '../registry/examples/DropdownWithRadioGroup.vue'
import FormDemo from '../registry/examples/FormDemo.vue'
import HoverCardDemo from '../registry/examples/HoverCardDemo.vue'
import InputDemo from '../registry/examples/InputDemo.vue'
import LabelDemo from '../registry/examples/LabelDemo.vue'
import MenubarDemo from '../registry/examples/MenubarDemo.vue'
import NavigationMenuDemo1 from '../registry/examples/NavigationMenu/NavigationMenuDemo1.vue'
import NavigationMenuDemo2 from '../registry/examples/NavigationMenu/NavigationMenuDemo2.vue'
import PaginationDemo from '../registry/examples/PaginationDemo.vue'
import PinInputDemo from '../registry/examples/PinInputDemo.vue'
import PopoverDemo from '../registry/examples/PopoverDemo.vue'
import ProgressDemo from '../registry/examples/ProgressDemo.vue'
import RadioGroupDemo from '../registry/examples/RadioGroupDemo.vue'
import RangeCalendarDemo1 from '../registry/examples/RangeCalendarDemo1.vue'
import RangeCalendarTwoMonths from '../registry/examples/RangeCalendarTwoMonths.vue'
import ResizableDemo from '../registry/examples/ResizableDemo.vue'
import ScrollAreaDemo from '../registry/examples/ScrollAreaDemo.vue'
import SelectDemo from '../registry/examples/SelectDemo.vue'
import SelectForm from '../registry/examples/SelectForm.vue'
import SelectScrollable from '../registry/examples/SelectScrollable.vue'
import SeparatorDemo from '../registry/examples/SeparatorDemo.vue'
import SheetDemo from '../registry/examples/SheetDemo.vue'
import SkeletonDemo from '../registry/examples/SkeletonDemo.vue'
import SliderDemo from '../registry/examples/SliderDemo.vue'
import SonnerDemo from '../registry/examples/SonnerDemo.vue'
import SwitchDemo from '../registry/examples/SwitchDemo.vue'
import TableDemo from '../registry/examples/TableDemo.vue'
import TabsDemo from '../registry/examples/TabsDemo.vue'
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

      <ComponentWrapper name="Checkbox">
        <div class="grid w-full max-w-xl gap-4">
          <CheckboxWithForm />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Collapsible">
        <div class="grid w-full max-w-xl gap-4">
          <CollapsibleDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Combobox">
        <div
          class="
            flex w-full flex-col gap-4
            md:flex-row md:flex-wrap
          "
        >
          <ComboboxDemo1 />
          <ComboboxDemo2 />
          <ComboboxDemo3 />
          <ComboboxDemo4 />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Command">
        <div class="flex w-full flex-col gap-6 p-0">
          <CommandDemo />
          <CommandWithDialog />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="ContextMenu">
        <div class="grid w-full max-w-xl gap-4">
          <ContextMenuDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="DatePicker">
        <div class="flex w-full max-w-xl flex-col gap-6">
          <div class="grid w-full gap-4">
            <DatePickerDemo1 />
            <DatePickerDemo2 />
            <DatePickerDemo3 />
          </div>

          <div class="grid w-full gap-4 rounded border p-4">
            <DatePickerWithForm />
          </div>
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Dialog">
        <div
          class="
            flex w-full flex-col gap-4
            md:flex-row md:flex-wrap
          "
        >
          <DialogWithForm />
          <DialogWithInlineInputs />
          <DialogWithScrollableContent />
          <DialogWithScrollableOverlay />
          <DialogWithStickyFooter />
          <DialogWithContextMenuTrigger />
          <DialogWithCustomCloseButton />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Drawer">
        <div
          class="
            flex w-full flex-col gap-4
            md:flex-row md:flex-wrap
          "
        >
          <DrawerDemo />
          <DrawerResponsiveForm />
          <DrawerWithScrollableContent />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Dropdown Menu">
        <div className="flex flex-wrap items-start gap-4">
          <DropdownDemo />
          <DropdownMenu />
          <DropdownWithCheckboxes />
          <DropdownWithRadioGroup />
          <DropdownMenuWithAvatar />
          <DropdownMenuAvatarOnly />
          <DropdownMenuIconButton />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Form">
        <div class="grid w-full max-w-xl gap-4">
          <FormDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Hover Card">
        <div
          class="
            grid w-full max-w-xl place-items-center gap-4
            md:rounded md:border
          "
        >
          <HoverCardDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Input">
        <div class="grid w-full max-w-xl gap-4">
          <InputDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Label">
        <div class="grid w-full max-w-xl gap-4">
          <LabelDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Menubar">
        <div class="grid w-full max-w-xl gap-4">
          <MenubarDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Navigation Menu">
        <span
          class="
            flex text-xs
            sm:hidden
          "
        >Hidden on small viewport</span>

        <div
          class="
            z-10 hidden w-full gap-6
            sm:flex sm:flex-col
          "
        >
          <NavigationMenuDemo1 />
          <NavigationMenuDemo2 />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Pagination">
        <div class="grid max-w-xl gap-4">
          <PaginationDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="PinInput">
        <div class="grid w-full max-w-xl gap-4">
          <PinInputDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Popover">
        <div class="grid w-full max-w-xl gap-4">
          <PopoverDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Progress">
        <div class="grid w-full max-w-xl gap-4">
          <ProgressDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Radio Group">
        <div class="grid w-full max-w-xl gap-4">
          <RadioGroupDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Range Calendar">
        <div class="grid w-full max-w-xl gap-4">
          <RangeCalendarDemo1 />
          <RangeCalendarTwoMonths />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Resizable">
        <div class="grid w-full max-w-xl gap-4">
          <ResizableDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Scroll Area">
        <div class="grid w-full max-w-xl gap-4">
          <ScrollAreaDemo />
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

      <ComponentWrapper name="Separator">
        <div class="grid w-full max-w-xl gap-4">
          <SeparatorDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Sheet">
        <div class="grid w-full max-w-xl gap-4">
          <SheetDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Skeleton">
        <SkeletonDemo />
      </ComponentWrapper>

      <ComponentWrapper name="Slider">
        <div class="grid w-full max-w-xl gap-4">
          <SliderDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Sonner">
        <div class="grid w-full max-w-xl gap-4">
          <SonnerDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Switch">
        <div class="grid w-full max-w-xl gap-4">
          <SwitchDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Table">
        <div class="grid w-full max-w-xl gap-4">
          <TableDemo />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="Tabs">
        <div class="grid w-full max-w-xl gap-4">
          <TabsDemo />
        </div>
      </ComponentWrapper>
    </div>
  </main>
</template>
