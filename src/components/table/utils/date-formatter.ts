import dayjs from 'dayjs';

export function dateFormatter(
  value: string | Date | null | undefined,
  format = 'DD/MM/YYYY',
) {
  return value ? dayjs(value).format(format) : '';
}
