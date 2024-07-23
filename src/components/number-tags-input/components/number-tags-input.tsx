import { TagsInput, type TagsInputProps } from '@mantine/core';
import { type ForwardedRef, forwardRef, useState } from 'react';

export interface NumberTagsInputProps
  extends Omit<TagsInputProps, 'onChange' | 'value'> {
  value: number[];
  onChange?: (value: number[]) => void;
}

export const NumberTagsInput = forwardRef(function NumberTagsInput(
  { value, onChange, onBlur, ...rest }: NumberTagsInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (v: string) => {
    const onlyNumbers = v.replace(/[^0-9]/g, '');
    setSearchValue(onlyNumbers);
  };

  return (
    <TagsInput
      value={value.map(String)}
      onChange={(v) => {
        const parsed = v.map(Number);
        if (parsed.some((p) => isNaN(p))) return;
        onChange?.(parsed);
      }}
      ref={ref}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onBlur={(e) => {
        if (searchValue.length > 0) {
          onChange?.([...value, Number(searchValue)]);
          setSearchValue('');
        }

        onBlur?.(e);
      }}
      {...rest}
    />
  );
});
