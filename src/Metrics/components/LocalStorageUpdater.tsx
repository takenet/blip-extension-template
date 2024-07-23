import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

export function LocalStorageUpdater({ name }: { name: string }) {
  const values = useWatch();

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(values));
  }, [name, values]);

  return null;
}
