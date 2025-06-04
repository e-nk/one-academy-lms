import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // One Academy colors namespace
        one: {
          // Primary colors
          primary: {
            black: '#000000',      // Black
            teal: '#10827b',       // Equali-Teal
            white: '#ffffff',      // White
            neon: '#00ffd9',       // Bring it ne-on
          },
          // Secondary colors
          secondary: {
            peach: '#ffa07a',      // Free peach
            fuchsia: '#e465ab',    // Girls are the fuchsia
            azul: '#081248',       // Action azul
            plum: '#73165a',       // Power plum
          },
        },
      },
      fontFamily: {
        // Brand guidelines fonts
        colfax: ['Colfax', 'sans-serif'],       // Primary font
        'italian-plate': ['"Italian Plate"', 'serif'],  // Secondary font
      },
			fontWeight: {
				demibold: '900',
			},
    },
  },
  plugins: [
    
  ],
}

export default config