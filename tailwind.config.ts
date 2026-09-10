import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        bubblegum: ['Bubblegum Sans', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        organ: {
          heart: "hsl(var(--organ-heart))",
          "heart-bg": "hsl(var(--organ-heart-bg))",
          brain: "hsl(var(--organ-brain))",
          "brain-bg": "hsl(var(--organ-brain-bg))",
          eyes: "hsl(var(--organ-eyes))",
          "eyes-bg": "hsl(var(--organ-eyes-bg))",
          lungs: "hsl(var(--organ-lungs))",
          "lungs-bg": "hsl(var(--organ-lungs-bg))",
          stomach: "hsl(var(--organ-stomach))",
          "stomach-bg": "hsl(var(--organ-stomach-bg))",
          liver: "hsl(var(--organ-liver))",
          "liver-bg": "hsl(var(--organ-liver-bg))",
          kidneys: "hsl(var(--organ-kidneys))",
          "kidneys-bg": "hsl(var(--organ-kidneys-bg))",
          bones: "hsl(var(--organ-bones))",
          "bones-bg": "hsl(var(--organ-bones-bg))",
          muscles: "hsl(var(--organ-muscles))",
          "muscles-bg": "hsl(var(--organ-muscles-bg))",
          skin: "hsl(var(--organ-skin))",
          "skin-bg": "hsl(var(--organ-skin-bg))",
          ears: "hsl(var(--organ-ears))",
          "ears-bg": "hsl(var(--organ-ears-bg))",
          tongue: "hsl(var(--organ-tongue))",
          "tongue-bg": "hsl(var(--organ-tongue-bg))",
          nose: "hsl(var(--organ-nose))",
          "nose-bg": "hsl(var(--organ-nose-bg))",
          intestines: "hsl(var(--organ-intestines))",
          "intestines-bg": "hsl(var(--organ-intestines-bg))",
          teeth: "hsl(var(--organ-teeth))",
          "teeth-bg": "hsl(var(--organ-teeth-bg))",
          blood: "hsl(var(--organ-blood))",
          "blood-bg": "hsl(var(--organ-blood-bg))",
        },
        quiz: {
          correct: "hsl(var(--quiz-correct))",
          wrong: "hsl(var(--quiz-wrong))",
          pending: "hsl(var(--quiz-pending))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
          "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
