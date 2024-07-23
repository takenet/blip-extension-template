import { Badge } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import {
  type AttendantStatus,
  getAttendantStatusColor,
  getAttendantStatusLabel,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';

export function AttendantStatusCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, AttendantStatus>) {
  const { language } = useTranslation();

  if (!value) return null;

  return (
    <div className="flex h-[40px] items-center gap-xs">
      <Badge variant="light" color={getAttendantStatusColor(value)}>
        {getAttendantStatusLabel(value, language)}
      </Badge>
    </div>
  );
}
