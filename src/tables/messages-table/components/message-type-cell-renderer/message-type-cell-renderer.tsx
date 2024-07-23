import { Badge } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import {
  getMessageTypeColor,
  getMessageTypeLabel,
  type MessageType,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';

export function MessageTypeCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, MessageType>) {
  const { language } = useTranslation();

  if (!value) return null;

  return (
    <div className="flex h-[40px] items-center gap-xs">
      <Badge variant="light" color={getMessageTypeColor(value)}>
        {getMessageTypeLabel(value, language)}
      </Badge>
    </div>
  );
}
