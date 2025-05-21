import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '10px'
  			}
  		},
  		colors: {
  			bg: 'var(--bg)',
  			'button-bg': 'var(--button-bg)',
  			border: 'var(--border)',
  			button: 'var(--button)',
  			hover: 'var(--button-hover)',
  			heading: 'var(--heading)',
  			common: 'var(--text-color)'
  		},
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			],
  			openSans: [
  				'var(--font-open-sans)',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        ".text-upright": {
          "text-orientation": "mixed",
          "writing-mode": "vertical-rl",
        },
      });
    },
      require("tailwindcss-animate")
],
};
export default config;
