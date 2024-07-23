import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Notifications, notifications } from '@mantine/notifications';
import { type ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from 'components/blip-ds/blip-ds-theme';
import { DatesProvider } from 'components/dates-provider';
import { TranslationProvider } from './components/translation-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(error);

      if (query.meta?.showErrorNotification === false) {
        return;
      }

      notifications.show({
        title: 'Ocorreu um erro',
        message: 'Não foi possível carregar os dados',
        variant: 'error',
      });
    },
  }),
});

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <DatesProvider>
            <Notifications />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </DatesProvider>
        </MantineProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}
