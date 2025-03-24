import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// Set initial theme
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'ChainSafe React Elements powered by Circle Web3 Services',
    brandImage: './circle-logo.svg',
  }),
});

// Listen for theme changes and update logo
addons.register('theme-switcher', (api) => {
  const channel = api.getChannel();

  if (channel) {
    channel.on('DARK_MODE', (isDark) => {
      const newTheme = create({
        base: isDark ? 'dark' : 'light',
        brandTitle: 'ChainSafe React Elements powered by Circle Web3 Services',
        brandImage: isDark ? './circle-logo-ondark.svg' : './circle-logo.svg',
      });

      addons.setConfig({ theme: newTheme });
    });
  }
});
