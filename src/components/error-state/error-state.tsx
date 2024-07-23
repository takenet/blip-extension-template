import type { AlertProps } from '@mantine/core';
import { Alert, Button, Group } from '@mantine/core';
import { Warning } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import { useTranslation } from 'contexts/translation-context';

export interface ErrorStateQuery {
  isFetching: boolean;
  refetch: () => void;
  error?: unknown;
}

export interface ErrorStateProps extends AlertProps {
  title?: string;
  query?: ErrorStateQuery | ErrorStateQuery[];
  children?: ReactNode;
  icon?: ReactNode;
}

export function ErrorState({
  query,
  title,
  children,
  icon,
  ...rest
}: ErrorStateProps) {
  const { t } = useTranslation();
  const isEmpty = !query && !children;

  const _title =
    title ??
    t({
      pt: 'Ocorreu um erro',
      en: 'An error occurred',
      es: 'Ocurrió un error',
    });

  return (
    <Alert
      color="red"
      icon={icon ?? <Warning size="2.75rem" weight="bold" />}
      title={_title}
      variant="light"
      {...rest}
    >
      {!isEmpty ? (
        <Group gap="xs">
          {query ? (
            <Button
              color="gray"
              loading={
                !Array.isArray(query)
                  ? query.isFetching
                  : query.some((q) => q.isFetching)
              }
              onClick={() => {
                if (Array.isArray(query)) {
                  for (const q of query) q.refetch();
                } else {
                  query.refetch();
                }
              }}
              size="xs"
              variant="light"
            >
              {t({
                pt: 'Tentar de novo',
                en: 'Try again',
                es: 'Intentar de nuevo',
              })}
            </Button>
          ) : null}
          {children}
        </Group>
      ) : null}
    </Alert>
  );
}
