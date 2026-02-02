import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-gotham)"],
      },
      fontSize: {
        "clamp-xl": "clamp(1.25rem,1.25rem + 2.125vw,3.5rem)",
        "clamp-lg": "clamp(1.125rem,1.125rem + 1.75vw,2.25rem)",
      },
      colors: {
        "dark-blue": "#191B23",
        "green": "#8BCA89",
        "gray": "#434343",
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
