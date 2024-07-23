import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { NoRowsOverlay } from '../components/no-rows-overlay';

interface Params {
  title?: string;
  description?: string;
  button?: ReactNode;
  icon?: ReactNode;
}

export function useNoRowsComponent({
  title,
  description,
  icon,
  button,
}: Params = {}) {
  const noRowsOverlayComponentParams = useMemo(
    () => ({
      title,
      description,
      icon,
      button,
    }),
    [button, description, icon, title],
  );

  return {
    noRowsOverlayComponent: NoRowsOverlay,
    noRowsOverlayComponentParams,
  };
}
