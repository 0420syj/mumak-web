// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import uiConfig from "@repo/new-ui/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  presets: [sharedConfig, uiConfig],
  content: [...uiConfig.content, "./src/**/*.tsx"],
};

export default config;
