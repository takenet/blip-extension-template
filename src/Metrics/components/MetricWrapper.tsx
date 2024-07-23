import { type ComponentProps, type ReactNode } from 'react';

interface Props extends ComponentProps<'div'> {
  children: ReactNode;
}

export function MetricWrapper({ children, style, ...rest }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--mantine-color-dark-6)',
        borderRadius: 'var(--mantine-radius-md)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
