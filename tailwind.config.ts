import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

// If you need the default theme, you can import it as well
// import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  // Enable JIT mode by uncommenting the following line
  // mode: 'jit',
  purge: {
    // Enable the purge in production by uncommenting the next line
    // enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    // overrides default px and sets units as rem, to compensate for zoom and font-size,. 1em=16px default
    screens: {
      'sm': '40rem',
      // => @media (min-width: 640px) { ... }

      'md': '48rem',
      // => @media (min-width: 768px) { ... }

      'lg': '64rem',
      // => @media (min-width: 1024px) { ... }

      'xl': '80rem',
      // => @media (min-width: 1280px) { ... }

      '2xl': '96rem',
      // => @media (min-width: 1536px) { ... }
    },
    groups: ['tooltip'],
    extend: {
      colors: {
        orange: colors.orange,
        ...{
          abya: {
            // all color modes
            'pink-500': '#ec4899',
            'pink-600': '#db2777',
            'alert': '#FFBF00',
            'gmute': '#8e8e8e', // '#8e8e8e',
          },
          abyl: {
            // light mode
            soft: '#E5E5E5',
            mute: '#D6D6D6',
            wpure: '#ffffff',
            nblack: 'rgb(12,12,12)',
            abyftext_def: '#8e8e8e', // '#8e8e8e',
          },
          abyd: {
            // dark mode
            soft: '#2E2E2E',
            mute: '#1F2223',
            bblack: 'rgb(12,12,12)',

            DEFAULT: '#171717', // not used
            nblack2: '#080808', // not used
            edtext_strong: '#cbcbcb', // not used
            edtext_def: 'rgb(142,142,142)', // '#8e8e8e',  //not used
            edbgcolortint2: '#363636', // not used
          },
        },
      },
      spacing: {
        15: '3.75rem', // following the standard of 128 / 4 = 32
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      // https://tailwindcss.com/docs/screens#adding-larger-breakpoints
      // additional breakpoints
      screens: {
        xs: '25rem', // 400px
        mds: '41.7rem', // 667px
        wide: '120rem', // 1920px
        verywide: '160rem', // 2560px
        superwide: '187.5rem', // 3000px
      },
      zIndex: {
        1: '1',
        1999: '1999',
        9999: '9999',
      },
    },
  },
  variants: {
    margin: ['responsive', 'hover', 'first'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    background: ['responsive', 'hover', 'focus', 'group-hover'],
    extend: {},
  },
  corePlugins: {
    //  preflight: false,
  },
  plugins: [
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || []

      groups.forEach((group) => {
        addVariant(`group-${group}-hover`, () => {
          return `:merge(.group-${group}):hover &`
        })
      })
    }),
  ],
}
