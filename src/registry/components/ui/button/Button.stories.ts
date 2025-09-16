import type { Meta, StoryObj } from '@storybook/vue3'
import type { ButtonVariants } from '.'

import { Icon } from '@iconify/vue'
import { html } from 'common-tags'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

/**
 * Button
 *
 * Displays a button or a component that looks like a button.
 */
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ['class'],
    },

    docs: {
      source: {
        code: html`<Button>Button</Button>`,
      },
    },
  },

  args: {
    default: 'Button',
  },

  render: args => ({
    components: { Button },

    setup() {
      return { args }
    },

    template: html`
      <Button v-bind="args">{{ args.default }}</Button>
    `,
  }),
}

export const IconVariant: Story = {
  parameters: {
    controls: {
      exclude: ['class', 'default', 'size'],
    },

    docs: {
      source: {
        code: html`
          <Button variant="outline" size="icon">
            <Icon icon="lucide:chevron-right" class="size-4" />
          </Button>
        `,
      },
    },
  },

  render: (args) => {
    return {
      components: { Button, Icon },

      setup() {
        return { args }
      },

      template: html`
        <Button variant="outline" size="icon" v-bind="args">
          <Icon icon="lucide:chevron-right" class="size-4" />
        </Button>
      `,
    }
  },
}

export const WithIcon: Story = {
  parameters: {
    controls: {
      exclude: ['class', 'default'],
    },

    docs: {
      source: {
        code: html`
          <Button>
            <Icon icon="lucide:mail" class="size-4" />
            Login with Email
          </Button>
        `,
      },
    },
  },

  render: (args) => {
    return {
      components: { Button, Icon },

      setup() {
        return { args }
      },

      template: html`
        <Button v-bind="args">
          <Icon icon="lucide:mail" class="size-4" />
          Login with Email
        </Button>
      `,
    }
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },

  parameters: {
    controls: {
      exclude: ['class', 'default'],

      size: {
        control: {
          type: 'select',
          options: ['xs', 'sm', 'md', 'lg'],
        },
      },
    },

    docs: {
      source: {
        code: html`
        <Button v-slot="{ loading }">
          <Icon
            icon="lucide:rotate-cw"
            :class="cn(loading && 'animate-spin')"
          />
          Please wait
        </Button>
        `,
      },
    },
  },

  render: (args) => {
    return {
      components: { Button, Icon },

      setup() {
        return { args, cn }
      },

      template: html`
        <Button v-bind="args" v-slot="{ loading }">
          <Icon
            icon="lucide:rotate-cw"
            :class="cn(loading && 'animate-spin')"
          />
          Please wait
        </Button>
      `,
    }
  },
}
