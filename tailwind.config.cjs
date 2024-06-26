/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                body: ["IBM Plex Sans", "Sans"],
                title: ["IBM Plex Sans", "Sans"]
            },
            fontSize: {
                body: [
                    "1rem",
                    {
                        lineHeight: "1.5rem"
                    }
                ],
                h1: [
                    "3.5rem",
                    {
                        lineHeight: "3.75rem"
                    }
                ],
                h2: [
                    "2.25rem",
                    {
                        lineHeight: "2.625rem"
                    }
                ],
                h3: [
                    "1.875rem",
                    {
                        lineHeight: "2.25rem"
                    }
                ],
                h4: [
                    "1.5rem",
                    {
                        lineHeight: "2rem"
                    }
                ],
                h5: [
                    "1.25rem",
                    {
                        lineHeight: "1.75rem"
                    }
                ],
                h6: [
                    "1.125rem",
                    {
                        lineHeight: "1.5rem"
                    }
                ],
                mini: [
                    "0.75rem",
                    {
                        lineHeight: "1.5rem"
                    }
                ]
            },
            colors: {
                black: {
                    DEFAULT: "#000000",
                    50: "#E6E6E6",
                    100: "#CCCCCC",
                    200: "#999999",
                    300: "#666666",
                    400: "#333333",
                    500: "#000000",
                    600: "#000000",
                    700: "#000000",
                    800: "#000000",
                    900: "#000000"
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    50: "#FFFFFF",
                    100: "#FCFCFC",
                    200: "#FCFCFC",
                    300: "#FAFAFA",
                    400: "#FAFAFA",
                    500: "#F7F7F7",
                    600: "#C7C7C7",
                    700: "#949494",
                    800: "#636363",
                    900: "#303030"
                },
                primary: {
                    50: "#eff6ff",   // Lightest blue
                    100: "#dbeafe",  // Very light blue
                    200: "#bfdbfe",  // Lighter blue
                    300: "#93c5fd",  // Light blue
                    400: "#60a5fa",  // Standard blue
                    500: "#3b82f6",  // Medium blue
                    600: "#2563eb",  // Darker blue
                    700: "#1d4ed8",  // Dark blue
                    800: "#1e40af",  // Deeper blue
                    900: "#1e3a8a"   // Deepest blue
                },
               
                badge: "#dbeafe",    // Example for a badge background
                badgeText: "#1e40af" // Example for badge text
            },
            keyframes: {
                colorfulBackground: {
                  '0%, 100%': { color: 'red' },
                  '25%': { color: 'yellow' },
                  '50%': { color: 'blue' },
                  '75%': { color: 'green' },
                },
              },
              animation: {
                colorfulBackground: 'colorfulBackground 5s linear infinite',
              },
            
            
        }
    },
    plugins: [require("@tailwindcss/typography")]
};
