/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@cfd/tailwind-config/postcss" {
  const config: any;
  export default config;
}

/// <reference types="next/images" />
declare module "*.svg" {
  const content: string;
  export default content;
}
