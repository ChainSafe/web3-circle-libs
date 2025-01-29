import React from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import '../src/tailwind.css';

const channel = addons.getChannel();

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true, // Show all controls
    },
    darkMode: {
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
    docs: {
      container: (props) => {
        const [isDark, setDark] = React.useState();

        React.useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark);
          return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
        }, [channel, setDark]);

        return <DocsContainer {...props} theme={isDark ? themes.dark : themes.light} />;
      },
      // canvas: {
      //   sourceState: 'shown', // Always show source
      // },
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
