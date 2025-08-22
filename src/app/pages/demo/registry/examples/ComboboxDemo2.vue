<script setup lang="ts">
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/ui/combobox'

interface UserRecord {
  id: number
  username: string
  image: string
}

const users: UserRecord[] = [
  {
    id: 1,
    username: 'uifaces.co',
    image: 'https://mighty.tools/mockmind-api/content/human/104.jpg',
  },
  {
    id: 2,
    username: 'uifaces-122',
    image: 'https://mighty.tools/mockmind-api/content/human/122.jpg',
  },
  {
    id: 3,
    username: 'avatar-01',
    image: '/example/avatar/01.png',
  },
]

const selectedUser = ref<UserRecord | null>(null)
</script>

<template>
  <Combobox v-model="selectedUser" by="username">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline"
          class="
            w-full justify-between
            md:w-[200px]
          "
        >
          <template v-if="selectedUser">
            <div class="flex items-center gap-2">
              <Avatar class="size-5">
                <AvatarImage
                  :src="selectedUser.image"
                  :alt="selectedUser.username"
                />
                <AvatarFallback>{{ selectedUser.username[0] }}</AvatarFallback>
              </Avatar>
              {{ selectedUser.username }}
            </div>
          </template>
          <template v-else>
            Select user...
          </template>
          <Icon icon="lucide:chevrons-up-down" class="ml-2 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxInput placeholder="Search user..." />

      <ComboboxEmpty>
        No user found.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="user in users"
          :key="user.id"
          :value="user"
        >
          <Avatar class="size-5">
            <AvatarImage
              :src="user.image"
              :alt="user.username"
            />
            <AvatarFallback>{{ user.username[0] }}</AvatarFallback>
          </Avatar>
          {{ user.username }}

          <ComboboxItemIndicator>
            <Icon icon="lucide:check" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxItem
          class="justify-start"
          :value="null"
          @select.prevent
        >
          <Icon icon="lucide:plus-circle" class="size-4" />
          Create user
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
