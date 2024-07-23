import { useController } from 'react-hook-form';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import type { TagsInputProps as OriginalTagsInputProps } from '@mantine/core';
import { TagsInput as OriginalTagsInput } from '@mantine/core';
import { useState } from 'react';

export type TagsInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<OriginalTagsInputProps, 'value' | 'defaultValue'>;

export function TagsInput<TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  onBlur,
  ...props
}: TagsInputProps<TFieldValues>) {
  const {
    field: { value, onChange: fieldOnChange, onBlur: fieldOnBlur, ...field },
    fieldState,
  } = useController<TFieldValues>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });
  const [searchValue, setSearchValue] = useState('');

  return (
    <OriginalTagsInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onBlur={(e) => {
        if (searchValue.length > 0) {
          fieldOnChange([...value, searchValue]);
          setSearchValue('');
        }

        fieldOnBlur();
        onBlur?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
