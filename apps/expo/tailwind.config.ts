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
      colors: {
        p: {
          0: "#090F1D",
          10: "#0F1A30",
          20: "#172648",
          30: "#1F3360",
          40: "#2E4D90",
          50: "#516BA2",
          60: "#7488B5",
          70: "#96A6C7",
          80: "#B9C4DA",
          90: "#D5DBE9",
          95: "#EFF2FB",
          99: "#F7F8FD",
          100: "#FFFFFF",
        },
        s: {
          0: "#2C1A0E",
          10: "#4A2C17",
          20: "#6F4222",
          30: "#94572D",
          40: "#B96D39",
          50: "#DE8344",
          60: "#E39863",
          70: "#E9AC82",
          80: "#EEC1A1",
          90: "#F4D6C1",
          95: "#F8E6DA",
          99: "#FCF3EE",
          100: "#FFFFFF",
        },
        t: {
          0: "#000000",
          10: "#2A1E33",
          20: "#473255",
          30: "#6A4A80",
          40: "#8D63AA",
          50: "#B17CD4",
          60: "#D495FF",
          70: "#DBA7FF",
          80: "#E2B8FF",
          90: "#E9CAFF",
          95: "#F1DCFF",
          99: "#F6EAFF",
          100: "#FFFFFF",
        },
        e: {
          0: "#000000",
          10: "#410E0B",
          20: "#601410",
          30: "#8C1D18",
          40: "#B3261E",
          50: "#B3261E",
          60: "#E46962",
          70: "#EC928E",
          80: "#F2B8B5",
          90: "#F9DEDC",
          95: "#FCEEEE",
          99: "#FFFBF9",
          100: "#FFFFFF",
        },
        n: {
          0: "#000000",
          10: "#1D1B20",
          20: "#322F35",
          30: "#48464C",
          40: "#605D64",
          50: "#79767D",
          60: "#938F96",
          70: "#AEA9B1",
          80: "#CAC5CD",
          90: "#E6E0E9",
          95: "#F5EFF7",
          99: "#FFFBFE",
          100: "#FFFFFF",
        },
        nv: {
          0: "#000000",
          10: "#1D1A22",
          20: "#322F37",
          30: "#49454F",
          40: "#605D66",
          50: "#79747E",
          60: "#938F99",
          70: "#AEA9B4",
          80: "#CAC4D0",
          90: "#E7E0EC",
          95: "#F5EEFA",
          99: "#FFFBFE",
          100: "#FFFFFF",
        },
        g: {
          0: "#219653",
        },
        x: {
          0: "#DC362E",
        },
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
