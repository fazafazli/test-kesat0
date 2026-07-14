import type {Config} from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}' , './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
                colors: {
                    orange: '#BD4C2D',
                    red: '#971010',
                    darkred: '#4C1517',
                    brown: '#3C3024',
                    yellow: '#FFC446',
                    darkpeach: '#E0BF88',
                    middarkpeach: '#FDE0A3',
                    lightpeach: '#FFF8D9',
                    navy: '#071A27',
                    blue: '#305D7A',
                },
                    fontFamily: {
                        Poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
                        Firlest: ['var(--font-firlest)', 'Firlest', 'serif'],
                    },
        },
    },
    plugins: [],
};
export default config;