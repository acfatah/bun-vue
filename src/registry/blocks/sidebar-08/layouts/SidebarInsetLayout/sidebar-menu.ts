import { Icon } from '@iconify/vue'
import { h } from 'vue'

export const sidebarMenu = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui-avatars.com/api/?name=CN',
  },

  teams: [
    {
      name: 'Acme Inc',
      logo: h(Icon, { icon: 'lucide:gallery-vertical-end' }),
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: h(Icon, { icon: 'lucide:audio-waveform' }),
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: h(Icon, { icon: 'lucide:command' }),
      plan: 'Free',
    },
  ],

  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: h(Icon, { icon: 'lucide:square-terminal' }),
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },

    {
      title: 'Models',
      url: '#',
      icon: h(Icon, { icon: 'lucide:bot' }),
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },

    {
      title: 'Documentation',
      url: '#',
      icon: h(Icon, { icon: 'lucide:book-open' }),
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },

    {
      title: 'Settings',
      url: '#',
      icon: h(Icon, { icon: 'lucide:settings-2' }),
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],

  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: h(Icon, { icon: 'lucide:frame' }),
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: h(Icon, { icon: 'lucide:chart-pie' }),
    },
    {
      name: 'Travel',
      url: '#',
      icon: h(Icon, { icon: 'lucide:map' }),
    },
  ],
}
