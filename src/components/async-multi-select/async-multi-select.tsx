import {
  type ComboboxItem,
  type ComboboxLikeRenderOptionInput,
  Loader,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { type FieldValues } from 'react-hook-form';
import { MultiSelect, type MultiSelectProps } from 'react-hook-form-mantine';

export type RenderOptionProps<TResponse> =
  ComboboxLikeRenderOptionInput<ComboboxItem> & {
    data: TResponse | undefined;
    search: string | undefined;
  };

export interface AsyncMultiSelectProps<
  TFieldValues extends FieldValues,
  TResponse,
> extends Omit<MultiSelectProps<TFieldValues>, 'renderOption'> {
  queryFn: (search: string | undefined) => Promise<TResponse[]>;
  parseOption: (item: TResponse) => { value: string; label: string };
  renderOption?:
    | ((item: RenderOptionProps<TResponse>) => React.ReactNode)
    | undefined;
}

export default function AsyncMultiSelect<
  TFieldValues extends FieldValues,
  TResponse,
>({
  queryFn,
  name,
  parseOption,
  renderOption,
  ...rest
}: AsyncMultiSelectProps<TFieldValues, TResponse>) {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars --- TODO: Fix this (make it so the query can be searched)
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const dataQuery = useQuery({
    queryKey: ['async-multi-select', name],
    queryFn: () => queryFn(undefined),
    enabled: focused,
    placeholderData: keepPreviousData,
  });

  const data = dataQuery.data
    ? dataQuery.data.map((item) => parseOption(item))
    : [];

  const _renderOption = useMemo(() => {
    if (!renderOption) return undefined;

    return (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
      const _data = dataQuery.data?.find(
        (i) => parseOption(i).value === item.option.value,
      );

      return renderOption({
        ...item,
        data: _data,
        search,
      });
    };
  }, [dataQuery.data, parseOption, renderOption, search]);

  return (
    <MultiSelect
      name={name}
      rightSection={dataQuery.isFetching ? <Loader size="xs" /> : undefined}
      data={data}
      searchable
      searchValue={search}
      onSearchChange={setSearch}
      onFocus={() => setFocused(true)}
      renderOption={_renderOption}
      {...rest}
    />
  );
}
