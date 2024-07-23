import { useController } from 'react-hook-form';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import type { NumberTagsInputProps as OriginalNumberTagsInputProps } from './components/number-tags-input';
import { NumberTagsInput as OriginalNumberTagsInput } from './components/number-tags-input';

export type NumberTagsInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<OriginalNumberTagsInputProps, 'value' | 'defaultValue'>;

export function NumberTagsInput<TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NumberTagsInputProps<TFieldValues>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<TFieldValues>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <OriginalNumberTagsInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
