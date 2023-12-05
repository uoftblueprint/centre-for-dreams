import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import baseConfig from "@cfd/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        poppins400: ["Poppins_400Regular", "sans-serif"],
        poppins500: ["Poppins_500Medium", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".font-display-lg": {
          "@apply font-poppins500 text-[57px] leading-[64px] tracking-[-0.25px]":
            {},
        },
        ".font-display-md": {
          "@apply font-poppins500 text-[45px] leading-[52px]": {},
        },
        ".font-display-sm": {
          "@apply font-poppins500 text-[36px] leading-[44px]": {},
        },
        ".font-headline-lg": {
          "@apply font-poppins500 text-[32px] leading-[40px]": {},
        },
        ".font-headline-md": {
          "@apply font-poppins500 text-[28px] leading-[36px]": {},
        },
        ".font-headline-sm": {
          "@apply font-poppins500 text-[24px] leading-[43px]": {},
        },
        ".font-title-lg": {
          "@apply font-poppins400 text-[22px] leading-[28px]": {},
        },
        ".font-title-md": {
          "@apply font-poppins500 text-[16px] leading-[24px] tracking-[0.15px]":
            {},
        },
        ".font-title-sm": {
          "@apply font-poppins500 text-[14px] leading-[20px] tracking-[0.1px]":
            {},
        },
        ".font-label-lg": {
          "@apply font-poppins500 text-[14px] leading-[20px] tracking-[0.1px]":
            {},
        },
        ".font-label-md": {
          "@apply font-poppins500 text-[12px] leading-[16px] tracking-[0.5px]":
            {},
        },
        ".font-label-sm": {
          "@apply font-poppins500 text-[11px] leading-[16px] tracking-[0.5px]":
            {},
        },
        ".font-body-lg": {
          "@apply font-poppins400 text-[16px] leading-[24px] tracking-[0.5px]":
            {},
        },
        ".font-body-md": {
          "@apply font-poppins400 text-[14px] leading-[20px] tracking-[0.25px]":
            {},
        },
        ".font-body-sm": {
          "@apply font-poppins400 text-[12px] leading-[16px] tracking-[0.4px]":
            {},
        },
      });
    }),
  ],
} satisfies Config;
