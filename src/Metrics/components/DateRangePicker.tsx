import {
  Button,
  ButtonGroup,
  InputError,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { useMemo } from 'react';
import { DatePicker } from '@mantine/dates';
import { CalendarOutline } from '@blip-ds/react-icons';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import dayjs from 'dayjs';
import { useTranslation } from 'contexts/translation-context';

export interface DateRangeValue {
  name: string;
  dates: [Date | null, Date | null];
}

export interface DateRangePickerProps<T extends FieldValues>
  extends UseControllerProps<T> {}

export function DateRangePicker<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
}: DateRangePickerProps<T>) {
  const { t } = useTranslation();

  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    disabled,
  });

  const options = useMemo(
    () => [
      {
        name: 'today',
        label: t({ pt: 'Hoje', en: 'Today', es: 'Hoy' }),
        getDates: () => [
          dayjs().startOf('day').toDate(),
          dayjs().endOf('day').toDate(),
        ],
      },
      {
        name: 'yesterday',
        label: t({ pt: 'Ontem', en: 'Yesterday', es: 'Ayer' }),
        getDates: () => [
          dayjs().subtract(1, 'day').startOf('day').toDate(),
          dayjs().subtract(1, 'day').endOf('day').toDate(),
        ],
      },
      {
        name: '7d',
        label: '7D',
        getDates: () => [
          dayjs().subtract(7, 'day').startOf('day').toDate(),
          dayjs().endOf('day').toDate(),
        ],
      },
      {
        name: '30d',
        label: '30D',
        getDates: () => [
          dayjs().subtract(30, 'day').startOf('day').toDate(),
          dayjs().endOf('day').toDate(),
        ],
      },
      {
        name: '90d',
        label: '90D',
        getDates: () => [
          dayjs().subtract(90, 'day').startOf('day').toDate(),
          dayjs().endOf('day').toDate(),
        ],
      },
    ],
    [t],
  );

  const getButtonProps = (_name: string) => {
    if (_name === field.value.name) {
      return {
        variant: 'light',
        style: { border: `1px solid var(--mantine-color-blue-outline)` },
      };
    }
    return {
      variant: 'default',
    };
  };

  const showCustomDates =
    (field.value as DateRangeValue).name === 'custom' &&
    (field.value as DateRangeValue).dates.every((date) => Boolean(date));

  return (
    <div ref={field.ref} className="p-xs">
      <ButtonGroup>
        <Popover>
          <PopoverTarget>
            <Button
              leftSection={<CalendarOutline size="1.25rem" />}
              {...getButtonProps('custom')}
            >
              {showCustomDates
                ? `${dayjs((field.value as DateRangeValue).dates[0]).format(
                    'MMM D, YYYY',
                  )} - ${dayjs((field.value as DateRangeValue).dates[1]).format(
                    'MMM D, YYYY',
                  )}`
                : t({ pt: 'Personalizado', en: 'Custom', es: 'Personalizado' })}
            </Button>
          </PopoverTarget>
          <PopoverDropdown>
            <DatePicker
              type="range"
              numberOfColumns={2}
              value={(field.value as DateRangeValue).dates}
              onChange={(dates) => {
                field.onChange({ name: 'custom', dates });
              }}
              minDate={dayjs().subtract(90, 'day').toDate()}
              maxDate={dayjs().toDate()}
            />
          </PopoverDropdown>
        </Popover>
        {options.map((option) => (
          <Button
            key={option.label}
            {...getButtonProps(option.name)}
            onClick={() => {
              field.onChange({ name: option.name, dates: option.getDates() });
            }}
            p={0}
            className="grow"
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      {fieldState.error?.message ? (
        <InputError>{fieldState.error.message}</InputError>
      ) : null}
      {/* <pre>{JSON.stringify(field.value, null, 2)}</pre> */}
    </div>
  );
}
