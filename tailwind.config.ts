import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f14",
        surface: "#121820",
        surface2: "#1a212b",
        border: "#243040",
        text: "#e6edf3",
        muted: "#8b9aad",
        accent: "#4da3ff",
        accentDim: "#1e4a75",
        warn: "#f0a04b",
        good: "#4ec9a0",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;