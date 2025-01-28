import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/tailwind.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        'div',
        {
          className: 'bg-background p-6',
        },
        Story(),
      );
    },
  ],
};

export default preview;
