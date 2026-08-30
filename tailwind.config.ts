import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        midnight: {
          950: "#1F0407", // Deepest Dark Maroon
          900: "#2B060B", // Dark Maroon
          800: "#3D0C13", // Medium Dark Maroon
          700: "#50121A", // Light Dark Maroon
        },
        navy: {
          950: "#050505", // Pure Black
          900: "#0A0A0A", // Dark Charcoal
          800: "#121212", // Warm Card Black
          700: "#1A1A1A", // Lighter Charcoal
        },
        purple: {
          400: "#E9D09E", // Light Gold
          500: "#DFBA73", // Primary Gold
          600: "#C5A059", // Medium Gold
          700: "#A37E3A", // Dark Gold
        },
        indigo: {
          400: "#DF8F73", // Copper/Rose Gold
          500: "#C57259", // Medium Copper
          600: "#A3533A", // Dark Copper
        },
        cyber: {
          blue: "#DFBA73", // Gold glow
          purple: "#C5A059",
          glow: "#DFBA73",
        },
        dark: {
          base: "#1F0407", // Dark Maroon base
          card: "#0A0A0A", // Black card
          border: "#3D0C13", // Maroon border
          muted: "#121212", // Warm black muted
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 22s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
