/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#16C9E0",
          magenta: "#FF08D9",
          purple: "#8B55E8",
          black: "#111111",
          white: "#FFFFFF",
          gray: {
            50: "#FAFAFA",
            100: "#F5F5F7",
            200: "#E5E5EA",
            300: "#D1D1D6",
            400: "#8E8E93",
            500: "#636366",
            600: "#48484A",
            700: "#3A3A3C",
            800: "#2C2C2E",
            900: "#1C1C1E",
          }
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Alexandria', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(17, 17, 17, 0.05)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'float': '0 25px 50px -12px rgba(17, 17, 17, 0.15)',
        'glow-cyan': '0 0 35px -5px rgba(22, 201, 224, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(139, 85, 232, 0.35)',
        'glow-magenta': '0 0 35px -5px rgba(255, 8, 217, 0.35)',
        'brand': '0 12px 30px -10px rgba(139, 85, 232, 0.25)',
      },
      keyframes: {
        floatCard: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        slowRotate: {
          '0%': { transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)' },
          '50%': { transform: 'perspective(1200px) rotateY(8deg) rotateX(-4deg)' },
          '100%': { transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)' },
        },
        gradientAura: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1) translate(0, 0)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08) translate(15px, -15px)' },
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        'float-card': 'floatCard 6s ease-in-out infinite',
        'slow-rotate': 'slowRotate 10s ease-in-out infinite',
        'gradient-aura': 'gradientAura 8s ease-in-out infinite',
        'shimmer': 'shimmerSweep 2.5s infinite',
      },
    },
  },
  plugins: [],
}
