import { type MantineThemeOverride } from '@mantine/core';
import { variantColorResolver } from './utils/variant-color-resolver';

export const theme = {
  fontFamily: 'Nunito Sans',
  defaultRadius: 'md',
  variantColorResolver,
  components: {
    Tooltip: {
      defaultProps: {
        withArrow: true,
      },
    },
    ActionIcon: {},
  },
} satisfies MantineThemeOverride;
