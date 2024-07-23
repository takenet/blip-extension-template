import {
  createPolymorphicComponent,
  ActionIcon as MActionIcon,
  type ActionIconProps as MActionIconProps,
} from '@mantine/core';
import './action-icon.css';
import { type ForwardedRef, forwardRef } from 'react';

export interface ActionIconProps extends MActionIconProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'delete';
}

export const ActionIcon = createPolymorphicComponent<'button', ActionIconProps>(
  forwardRef(function ActionIcon(
    { variant = 'primary', ...rest }: ActionIconProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      <MActionIcon
        ref={ref}
        radius="md"
        variant={variant}
        styles={{
          root: {},
          icon: {},
          loader: {},
        }}
        {...rest}
      />
    );
  }),
);
