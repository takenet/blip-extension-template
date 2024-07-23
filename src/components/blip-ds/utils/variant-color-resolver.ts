import {
  type VariantColorsResolver,
  defaultVariantColorsResolver,
} from '@mantine/core';

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === 'tertiary') {
    return {
      background: 'transparent',
      hover: 'hsl(var(--color-gray-100))',
      border: `1px solid hsl(var(--color-gray-200))`,
      color: 'hsl(var(--color-gray-800))',
    };
  }

  return defaultResolvedColors;
};
