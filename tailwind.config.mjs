// tailwind.config.mjs
import { defineConfig } from 'tailwindcss/vite';

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Enable dark mode based on a class
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {

        'cream-white': '#FFFDF6',
        'light-purple': '#F5F3FF', 
        'light-blue': '#EFF6FF',   
        
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
      },
      fontFamily: {
        // You were using Open Sans, let's make it a formal part of the theme
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
});