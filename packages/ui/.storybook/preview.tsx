import React from 'react';

import type { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/components/theme-provider';
import { ModeToggle } from '../src/components/mode-toggle';

import '@ui/styles.css';

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider defaultTheme="light">
        <div className="flex flex-wrap items-center justify-center gap-8 w-full h-full">
          <div className="flex flex-col items-center justify-center gap-8 p-8">
            <ModeToggle />
          </div>
          <div className="flex flex-col items-center justify-center gap-8 p-8 bg-red-500">
            <Story />
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
