import type { Preview } from '@storybook/react';
import '../app/tailwind.css';

/* Fix for BigInt serialization */
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
