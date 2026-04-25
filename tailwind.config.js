/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bicycle-bg": "#000000",
        "site-bg": "#0a0a0a",
        "text-primary": "#1a1a1a",
        "text-secondary": "#666666",
        "accent-gold": "#d4af37",
        "accent-sky": "#e8f4f8"
      },
      fontFamily: {
        sans: ["Inter", "General Sans", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
