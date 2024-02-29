import React from "react";

import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src/components/theme-provider";
import { ModeToggle } from "../src/components/mode-toggle";

import "@ui/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div
          style={{
            display: "flex",
            flexFlow: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            <ModeToggle />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            {" "}
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
