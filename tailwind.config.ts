import type { Config } from "tailwindcss";

/* Palette derived from the official Dolphin Immigration logo (#6e3f98).
   Token names kept (navy/ocean/teal/sand) so components need no changes:
   - ocean = brand purple (primary)
   - navy  = deep purple (dark sections)
   - teal  = accent
   - sand  = light lilac background */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#3a2159", 900: "#291641", 700: "#4c2a73" },
        ocean: { DEFAULT: "#6e3f98", 400: "#9269bd", 600: "#58307b" },
        teal: { DEFAULT: "#16b8a6", 400: "#3fd1c0" },
        sand: "#f6f3fb",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
