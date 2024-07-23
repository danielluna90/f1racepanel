/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      light: {
        "primary": "#F09A9A",
        "secondary": "#E2BD86",
        "accent": "#F16F49",
        "neutral": "#291334",
        "base-100": "#FAF7F5",
        "base-200": "#EFEAE6",
        "base-300": "#E7E2DF",
        "base-content": "#291334",
      }
    }, {
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": "#660F0F",
        "secondary": "#77531D",
        "accent": "#B4340E",
        "base-100": "#15191e",
        "base-200": "#191e24",
        "base-300": "#1d232a",
      },
    },],
  },
  darkMode: ['selector', '[data-theme="dark"]']
}

