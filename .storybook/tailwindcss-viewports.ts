/** https://tailwindcss.com/docs/responsive-design */
export const TAILWINDCSS_VIEWPORTS = {
  'xs': {
    name: 'Mobile',
    styles: {
      // 20rem
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },

  'sm': {
    name: 'Breakpoint: sm',
    styles: {
      // 40rem
      width: '640px',
      height: '768px',
    },
    type: 'mobile',
  },

  'md': {
    name: 'Breakpoint: md',
    styles: {
      // 48rem
      width: '768px',
      height: '768px',
    },
    type: 'tablet',
  },

  'lg': {
    name: 'Breakpoint: lg',
    styles: {
      // 64rem
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },

  'xl': {
    name: 'Breakpoint: xl',
    styles: {
      // 80rem
      width: '1280px',
      height: '768px',
    },
    type: 'desktop',
  },

  '2xl': {
    name: 'Breakpoint: 2xl',
    styles: {
      // 96rem
      width: '1536px',
      height: '768px',
    },
    type: 'desktop',
  },
}
