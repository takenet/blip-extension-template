import type { LoaderProps } from '@mantine/core';
import { Loader } from '@mantine/core';
import { type ComponentProps } from 'react';
import classes from './loading-state.module.css';

export interface LoadingStateProps extends LoaderProps {
  title?: string;
  wrapperProps?: ComponentProps<'div'>;
}

export function LoadingState({
  wrapperProps,
  title,
  ...rest
}: LoadingStateProps) {
  return (
    <div className={classes.root} {...wrapperProps}>
      <Loader {...rest} />
      {title}
    </div>
  );
}
