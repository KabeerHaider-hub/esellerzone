import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF4EA",
          200: "#FFC995",
          300: "#FFB15C",
          400: "#F99A3E",
          500: "#F58220",
          600: "#E06A12",
          700: "#B4510D",
        },
        ink: {
          950: "#05060A",
          900: "#090B12",
          800: "#0F121C",
          700: "#161A27",
          600: "#222738",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "grid-pan": { "0%": { backgroundPosition: "0 0" }, "100%": { backgroundPosition: "0 64px" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        pulseglow: { "0%,100%": { opacity: "0.55" }, "50%": { opacity: "1" } },
      },
      animation: {
        "grid-pan": "grid-pan 3s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        marquee: "marquee 40s linear infinite",
        pulseglow: "pulseglow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
