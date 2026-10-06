import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#162239",
          darker: "#0c1228",
          surface: "#172238",
          card: "#18233a",
          footer: "#152036",
        },
        accent: {
          gold: "#f5a425",
          hover: "#ffb834",
          cyan: "#33CCFF",
        },
        zion: {
          950: "#0c1228",
          900: "#162239",
          850: "#172238",
          800: "#18233a",
          700: "#152036",
          gold: "#f5a425",
          amber: "#fcb040",
          cyan: "#33ccff",
        }
      },
      fontFamily: {
        sans: ["'Montserrat'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0px 0px 30px rgba(0,0,0,0.5)",
        gold: "0 10px 25px -5px rgba(245, 164, 37, 0.4)",
      },
      animation: {
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
