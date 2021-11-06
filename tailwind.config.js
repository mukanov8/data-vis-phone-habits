module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  theme: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'Segoe UI', 'Helvetica', 'sans-serif'],
    },
    extend: {
      colors: {
        black: '#000000',
        lightblue: '#1896ea',
        primaryblue: '#2F80ED',
        azure: '#F4F8FA',
        navyblue: '#1b365d',
        red: '#f44336',
        lightgray: 'rgba(0, 0, 0, 0.54)',
        darkgray: 'rgba(0, 0, 0, 0.87)',
      },
      spacing: {
        12.5: '50px',
        100: '412px',
        106: '542px',
      },
      borderRadius: {
        large: '12px',
      },
      borderWidth: {
        1: '1.5px',
      },
      boxShadow: {
        normal: '0 0 20px 5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
    },
  },
}
