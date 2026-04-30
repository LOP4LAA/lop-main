/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['New York', 'sans-serif'],
        poppins: ["Poppins", 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        kanit: ["Kanit", 'sans-serif'],
        andada: ['Andada Pro']
      },

      colors: {
        primary: "#1F1F39",
        "primary_100": "#38385B",
        grey: "#9E9E9E",
        secondary: "#F8B133",
        secondary_1: "#FC8619",
        secondary_2: "#F8B13326",
        grey_1: "#949494",
        grey_2: "#65558F14",
        grey_3: "#959595",
        grey_4: "#858597",
        grey_5: "#80948A",
        error: "#D90000",
        grey_2: "#D9D9D9",
        grey_3: "#8E98A8",
        teal_1: "#BBDDD9"
      },
      borderWidth: {
        1: "1px"
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        fadeInLeft: 'fadeInLeft 0.6s ease-out forwards',
        fadeInRight: 'fadeInRight 0.6s ease-out forwards',
        scaleIn: 'scaleIn 0.5s ease-out forwards',
        slideInUp: 'slideInUp 0.5s ease-out forwards',
        slideInDown: 'slideInDown 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(
      function ({ addUtilities }) {
        addUtilities({
          '.hide_tap': {
            '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)'
          },
          '.unset-min-w': {
            'min-width': 'unset'
          },
          '.no-scrollbar::-webkit-scrollbar': {
            'display': 'none'
          },
          '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          },
          '.capitalize-first::first-letter': {
            'text-transform': 'uppercase'
          }


        })
      }),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('child-not-last', '& > *:not(:last-child)');
      addVariant('child-not-first', '& > *:not(:first-child)');
    }
  ]
}

