import { useEffect, useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { track } from 'lib/utils/track';

export function useFormTracking(form: UseFormReturn, tableName: string) {
  const { isDirty } = form.formState;
  const trackedRef = useRef<Record<string, boolean | undefined>>({});

  useEffect(() => {
    if (isDirty && !trackedRef.current[tableName]) {
      track('interacted-with-filter-form', { tableName });
      trackedRef.current[tableName] = true;
    }
  }, [isDirty, tableName]);
}
