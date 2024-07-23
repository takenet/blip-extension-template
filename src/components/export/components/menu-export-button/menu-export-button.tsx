import type { ActionIconProps } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import classes from './menu-export-button.module.css';

export interface MenuExportButtonProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {}

export const MenuExportButton = forwardRef(function DownloadMenuButton(
  { className, ...rest }: MenuExportButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <ActionIcon
      className={className ? `${className} ${classes.root}` : classes.root}
      variant="default"
      w="1.25rem"
      miw="1.25rem"
      ref={ref}
      {...rest}
    >
      <CaretDown size="0.8rem" weight="bold" />
    </ActionIcon>
  );
});
