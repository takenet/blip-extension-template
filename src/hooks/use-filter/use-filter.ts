import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { type z, type ZodSchema } from 'zod';

export interface UseFilterParams<TFormSchema extends ZodSchema> {
  getter: (values: z.infer<TFormSchema>) => string;
  schema: TFormSchema;
}

export function useFilter<TFormSchema extends ZodSchema>(
  params?: UseFilterParams<TFormSchema>,
) {
  const values = useWatch();

  const filter = useMemo(() => {
    if (!params) {
      return undefined;
    }

    const parsed = params.schema.safeParse(values) as z.SafeParseReturnType<
      z.infer<TFormSchema>,
      z.infer<TFormSchema>
    >;
    return parsed.success ? params.getter(parsed.data) : undefined;
  }, [params, values]);

  return filter;
}
