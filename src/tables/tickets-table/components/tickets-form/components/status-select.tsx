import { MultiSelect, type MultiSelectProps } from 'react-hook-form-mantine';
import {
  ColorSwatch,
  type ComboboxItem,
  type ComboboxLikeRenderOptionInput,
  Flex,
} from '@mantine/core';
import { type FieldValues } from 'react-hook-form';
import {
  getTicketStatusColor,
  getTicketStatusLabel,
  ticketStatuses,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';

type Props<TFieldValues extends FieldValues> = MultiSelectProps<TFieldValues>;

export function StatusSelect<TFieldValues extends FieldValues>({
  ...rest
}: Props<TFieldValues>) {
  const { language } = useTranslation();

  return (
    <MultiSelect
      label="Status"
      data={ticketStatuses.map((s) => ({
        value: s,
        label: getTicketStatusLabel(s, language),
      }))}
      renderOption={StatusOption}
      clearable
      {...rest}
    />
  );
}

function StatusOption({ option }: ComboboxLikeRenderOptionInput<ComboboxItem>) {
  return (
    <Flex align="center" gap="xs">
      <ColorSwatch
        size="16px"
        color={`var(--mantine-color-${getTicketStatusColor(option.value)}-filled)`}
      />
      {option.label}
    </Flex>
  );
}
