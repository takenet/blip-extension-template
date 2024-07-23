import { Badge } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import {
  getTicketStatusColor,
  getTicketStatusLabel,
  type TicketStatus,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';

export function TicketStatusCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, TicketStatus>) {
  const { language } = useTranslation();

  if (!value) return null;

  return (
    <div className="flex h-[40px] items-center gap-xs">
      <Badge variant="light" color={getTicketStatusColor(value)}>
        {getTicketStatusLabel(value, language)}
      </Badge>
    </div>
  );
}
