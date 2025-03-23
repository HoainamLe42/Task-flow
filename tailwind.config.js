import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#1DA1F2',
                primary: {
                    DEFAULT: '#FF5B26',
                    hover: '#FF5B26',
                    border: colors.orange[400],
                    text: colors.orange[500],
                    dark: colors.orange[800],
                    ['dark-hover']: colors.orange[900],
                },
                secondary: {
                    DEFAULT: colors.neutral[200],
                    hover: colors.neutral[100],
                    border: colors.neutral[400],
                    text: colors.neutral[500],
                    dark: colors.neutral[800],
                    ['dark-hover']: colors.neutral[900],
                },
            },
        },
    },
    plugins: [],
};
