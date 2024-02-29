import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
  content: ["./src/**/*.{md,mdx,ts,tsx}"],
  presets: [sharedConfig],
};

export default config;
