import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131044",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        aboreto: ["Aboreto", "cursive"],
        alegreya: ["Alegreya SC", "serif"],
        agbalumo: ["Agbalumo", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      
    },
  },
  plugins: [],
} satisfies Config;
