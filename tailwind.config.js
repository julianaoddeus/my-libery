
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        sidebar: "var(--sidebar)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-foreground": "var(--sidebar-foreground)",
      },
    },
  },
  darkMode: ["class"], 
  plugins: [require("tailwindcss-animate")],
};


