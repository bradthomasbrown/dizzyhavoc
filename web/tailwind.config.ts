import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dzhv-wallpaper-0': "url('/dzhv-wallpaper-0.jpg')"
      },
      fontFamily: {
        'mono': ['Roboto Mono', 'monospace']
      },
      screens: {
        '2xl': '2001px', // => @media (min-width: 1440px) { ... }
      }
    }
  }
} satisfies Config;
