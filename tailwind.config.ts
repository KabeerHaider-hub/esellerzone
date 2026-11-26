import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF1EA",
          200: "#FFC2A1",
          300: "#FF9A66",
          400: "#FF7838",
          500: "#FF590D",
          600: "#E64A05",
          700: "#B83A04",
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
