import { type FieldValues } from 'react-hook-form';
import {
  DatePickerInput,
  type DatePickerInputProps,
} from 'react-hook-form-mantine';

type Props<TFieldValues extends FieldValues> =
  DatePickerInputProps<TFieldValues>;

export default function DateRangeInput<TFieldValues extends FieldValues>({
  ...rest
}: Props<TFieldValues>) {
  return (
    <DatePickerInput type="range" clearable allowSingleDateInRange {...rest} />
  );
}
