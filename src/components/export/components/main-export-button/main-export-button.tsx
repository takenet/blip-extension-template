import type { ActionIconProps } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

export interface MainExportButtonProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {}

export const MainExportButton = forwardRef(function MainDownloadButton(
  { ...rest }: MainExportButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <ActionIcon variant="default" ref={ref} {...rest}>
      <DownloadSimple size="1.25rem" />
    </ActionIcon>
  );
});
