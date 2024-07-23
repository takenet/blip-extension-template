import { createSafeContext } from '@mantine/core';
import type { RefObject } from 'react';

export const [GlobalProvider, useGlobalContext] = createSafeContext<{
  formRef: RefObject<HTMLDivElement>;
}>(
  'GlobalContextProvider not found, make sure you are using it inside AppShell',
);
