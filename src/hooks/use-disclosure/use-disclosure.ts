import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';

export interface Disclosure {
  opened: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
}

export function useDisclosure(initialState?: boolean | undefined) {
  const [opened, { close, open, toggle }] = useMantineDisclosure(initialState);

  return {
    opened,
    close,
    open,
    toggle,
  };
}
