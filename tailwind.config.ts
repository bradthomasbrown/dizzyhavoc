import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "mono": ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".loading": {
          border: "solid 1px #ffffff08",
          background:
            "linear-gradient(45deg, rgba(0,0,0,0) 30%, rgba(128,255,255,0.068) 50%, rgba(0,0,0,0) 70%) no-repeat",
          backgroundSize: "200% 200%",
          animation: "loading 2.5s ease infinite",
        },
      });
    }),
  ],
} satisfies Config;