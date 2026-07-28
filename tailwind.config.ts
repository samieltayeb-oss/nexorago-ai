import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      // xs starts at 320px for very small phones
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        nexora: {
          dark: "#080808",
          surface: "#111111",
          card: "#1A1A1A",
          gold: "#C49A10",
          "gold-bright": "#E5B830",
          "gold-dark": "#6B4F08",
          cream: "#F2EDE4",
          "cream-muted": "#ADA89F",
          "cream-dark": "#5C5852",
          border: "rgba(196, 154, 16, 0.14)",
          "border-subtle": "rgba(255, 255, 255, 0.05)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "sans-serif"],
        mono: ["var(--font-spacemono)", "Space Mono", "monospace"],
      },
      boxShadow: {
        nexora: "0 8px 32px 0 rgba(0, 0, 0, 0.8)",
        gold: "0 4px 20px 0 rgba(196, 154, 16, 0.25)",
      },
      height: {
        // Dynamic viewport heights — critical for mobile browser chrome handling
        "screen-dvh": "100dvh",
        "screen-svh": "100svh",
      },
      minHeight: {
        "screen-dvh": "100dvh",
        "screen-svh": "100svh",
      },
      spacing: {
        // Safe-area spacing tokens
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
        "safe-left": "env(safe-area-inset-left, 0px)",
        "safe-right": "env(safe-area-inset-right, 0px)",
      },
    },
  },
  plugins: [],
};

export default config;
