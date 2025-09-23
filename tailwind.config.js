/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: false,
      // padding: {
      //   DEFAULT: '1rem', // 16px 양쪽 여백
      //   bottom: '6rem',
      // },
      screens: {
        DEFAULT: '480px',
      },
    },
    extend: {
      colors: {
        primary: {
          100: '#EDF9FF',
          200: '#D7F1FF',
          300: '#B9E7FF',
          400: '#50C4FF',
          500: '#28A6FF', 
          600: '#188CFF', // Main Blue
          700: '#0A70EB',
          800: '#0F59BE',
          900: '#134E95',
        },
        gray: {
          100: '#F1F5F9',
          200: '#D6DBDF',
          300: '#BFC3C7',
          400: '#A8ACAF',
          500: '#919297', 
          600: '#74777E',  // Main Gray
          700: '#585A66',
          800: '#3C404E',
          900: '#202436',
        },
        navy: {
          100: '#5B84C4',
          200: '#00194F'
        },
        // 배경색 전용
        'bg-white': '#F7F9FF',
        'bg-black': '#232323',
      },
      boxShadow: {
        'primary': '0 2px 8px 0 rgba(255, 85, 0, 0.12)',
      },
      fontSize: {
	      //px 크기에 맞춤
        8: '0.5rem',  
        9: '0.5625rem',
        10: '0.625rem',
        11: '0.6875rem',
        12: '0.75rem',
        13: '0.8125rem',
        14: '0.875rem',
        15: '0.9375rem',
        16: '1rem',
        17: '1.0625rem',
        18: '1.125rem',
        19: '1.1875rem',
        20: '1.25rem',
        21: '1.3125rem',
        22: '1.375rem',
        23: '1.4375rem',
        24: '1.5rem',
        25: '1.5625rem',
        26: '1.625rem',
        27: '1.6875rem',
        28: '1.75rem',
        29: '1.8125rem',
        30: '1.875rem',
        31: '1.9375rem',
        32: '2rem',
        33: '2.0625rem',
        34: '2.125rem',
        35: '2.1875rem',
        36: '2.25rem',
        37: '2.3125rem',
        38: '2.375rem',
        39: '2.4375rem',
        40: '2.5rem',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', 'sans-serif'],
      },
      spacing: {
        4: '0.25rem',   // 4px
        8: '0.5rem',    // 8px
        12: '0.75rem',  // 12px
        16: '1rem',     // 16px
        20: '1.25rem',  // 20px
        24: '1.5rem',   // 24px
        28: '1.75rem',  // 28px
        32: '2rem',     // 32px
        36: '2.25rem',  // 36px
        40: '2.5rem',   // 40px
        44: '2.75rem',  // 44px
        48: '3rem',     // 48px
        52: '3.25rem',  // 52px
        56: '3.5rem',   // 56px
        60: '3.75rem',  // 60px
        64: '4rem',     // 64px
      },
      borderRadius: {
			  4: '0.25rem',   // 4px
			  8: '0.5rem',    // 8px
			  12: '0.75rem',  // 12px 
			  16: '1rem',     // 16px 
			  20: '1.25rem',  // 20px 
			  24: '1.5rem',   // 24px 
			},
      minWidth: {
        'mobile-min': '320px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}