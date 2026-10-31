/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Prevents Tailwind from wiping out custom headings, buttons and typography
  },
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary-hsl, 262.1 83.3% 57.8%))",
          foreground: "hsl(var(--primary-foreground-hsl, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-hsl, 199 89% 48%))",
          foreground: "hsl(var(--secondary-foreground-hsl, 0 0% 100%))",
        },
        border: "hsl(var(--border-hsl, 214.3 31.8% 91.4%))",
        background: "hsl(var(--background-hsl, 0 0% 100%))",
        foreground: "hsl(var(--foreground-hsl, 222.2 84% 4.9%))",
        muted: {
          DEFAULT: "hsl(var(--muted-hsl, 210 40% 96.1%))",
          foreground: "hsl(var(--muted-foreground-hsl, 215.4 16.3% 46.9%))",
        },
        ring: "hsl(var(--ring-hsl, 262.1 83.3% 57.8%))",
      },
    },
  },
  plugins: [],
}
