/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // để cái này là nó sẽ apply frame của nó vào các file của mình trong scr
  theme: {
    extend: { // những thứ mà mình custom nó ra thì bỏ ở đâ
      colors: {
        black: '#191624',
        near_black: '#202027',
        grey_bg: '#2F303A',
        cancel_grey: '#636669',
        submit_blue: '#5291CC',
        sign_up_blue: '#607EE9',
        sign_up_now: '#D34692',
        bg_sign_up: '#2F303A',
        form_sign_up: '#202027',
        input_blue: '#385CDD',
        background: '#1F263E',
        searchBar: '#303750',
        backgroundForMain: '#F2F2F7'
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
        
      },
      transitionProperty: {
        'slide-left': 'transform, opacity',
      },
      transitionDuration: {
        '500': '0.5s',
      },
      translate: {
        'full': '100%',
        '-full': '-100%',
      },
      
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      
 
    },
  },
};
