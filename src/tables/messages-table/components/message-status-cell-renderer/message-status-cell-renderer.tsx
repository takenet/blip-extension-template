import { Badge } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import {
  getMessageStatusColor,
  getMessageStatusLabel,
  type AttendantStatus,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';

export function MessageStatusCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, AttendantStatus>) {
  const { language } = useTranslation();

  if (!value) return null;

  return (
    <div className="flex h-[40px] items-center gap-xs">
      <Badge variant="light" color={getMessageStatusColor(value)} size="md">
        {getMessageStatusLabel(value, language)}
      </Badge>
    </div>
  );
}
