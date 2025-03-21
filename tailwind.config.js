/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      screens: {
        desktop: { max: '1200px' }, // 데스크탑 스타일
        tablet: { max: '744px' }, // 태블릿 스타일
        mobile: { max: '375px' }, // 모바일 스타일
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },

        // Custom properties
        'core-white': '#FFFFFF',
        'core-black': '#000000',
        'content-primary': '#09090B',
        'content-secondary': '#62626A',
        'content-tertiary': '#A1A1AA',
        'background-primary': '#FFFFFF',
        'background-secondary': '#FAFAFA',
        'background-tertiary': '#F4F4F5',
        'border-primary': '#E4E4E7',
        'border-secondary': '#F4F4F5',
        'border-tertiary': '#FAFAFA',
        'border-hover-overlay': 'rgba(0, 0, 0, 0.2)',
        'feature-easy': '#8BC34A',
        'feature-medium': '#FFC107',
        'feature-hard': '#FF5722',
        'brand-primary': {
          DEFAULT: '#98FF98',
          200: '#00A500',
        },
        secondary: {
          DEFAULT: '#18181B',
          100: '#FAFAFA',
        },
        'system-error': '#F31260',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      // Custom properties
      fontSize: {
        'display-large': [
          '48px',
          {
            lineHeight: '48px',
            fontWeight: '800',
            letterSpacing: '-2.5%',
          },
        ],
        'heading-large': [
          '36px',
          {
            lineHeight: '48px',
            fontWeight: '700',
            letterSpacing: '-2.5%',
          },
        ],
        'heading-medium': [
          '30px',
          {
            lineHeight: '40px',
            fontWeight: '700',
            letterSpacing: '-2.5%',
          },
        ],
        'heading-small': [
          '24px',
          {
            lineHeight: '32px',
            fontWeight: '700',
            letterSpacing: '-2.5%',
          },
        ],
        'heading-tiny': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '700',
            letterSpacing: '-2.5%',
          },
        ],
        'label-large': [
          '18px',
          {
            lineHeight: '28px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        'label-base': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        'label-small': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        'label-tiny': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        'paragraph-large': [
          '18px',
          {
            lineHeight: '28px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        'paragraph-base': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        'paragraph-small': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        'paragraph-tiny': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
