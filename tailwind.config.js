module.exports = {
  purge: {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}',],
    options: {
      whitelist: ['is-active'],
    }
  },
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "1920px"
    },
    fontFamily: {
      'display': ['Playfair Display', 'Arial', 'sans-serif'],
      'sans': ['Alata', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#FAFAFA',
        green: {
          light: '#308287',
          default: '#365757'
        },
        peach: {
          light: '#FFF2EB',
          default: '#FFDEC9'
        },
        pink: {
          default: '#FFC7BD'
        },
        orange: {
          default: '#DD9881',
          dark: '#D07354'
        }
      },
      fontSize: {
        '5xl': '2.95rem',
        '6xl': '3.45rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
