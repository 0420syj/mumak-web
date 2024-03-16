import React from 'react';

import type { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/components/theme-provider';
import { ModeToggle } from '../src/components/mode-toggle';

import '@ui/styles.css';

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider defaultTheme="light">
        <div className="flex flex-col items-start justify-start gap-4 w-full h-full">
          <div className="flex flex-row items-center justify-start rounded-lg bg-slate-300 w-full p-4">
            <ModeToggle />
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="flex w-full justify-center min-h-[350px] p-10 items-center">
              <Story />
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
