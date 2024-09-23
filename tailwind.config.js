/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1442px',
    },
    extend: {
      backgroundPosition: {
        'center-250px': 'center 250px',
      },
      backgroundSize: {
        'gift-size': '650px 650px',
      },
      backgroundImage: {
        'desktop-image': "url('/assets/images/desktop-bg.png')",
        'gift-image':"url('/assets/images/gift.png')",
        'round-circle':"url('/assets/images/circle.png')"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        abhaya:['Abhaya Libre', 'sans-serif'],
        monto:['Montserrat', 'sans-serif'],
        railway:['Raleway', 'sans-serif'],
        manrope:['Manrope','sans-serif']
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
    colors:{
      primary:'#39D2C0',
      'secondary-green':'#109186',
      'dark-green':'#1E8078',
      'light-green':'#9BE8DF',
      'orange':'#FF8548',
      'blue':'#4285F4',
      'black':'#202020',
      'gray' :'#DCDBDD', 
      'dark-gray':"#E3E3E3",
      'extra-green':"#05302D",
      'gray-400':"#84818A",
      'gray-100':'#E7E7E7'
    }
  },
  plugins: [],
}