import {
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Text,
} from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import { useTranslation } from 'contexts/translation-context';

export function LongTextCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, unknown>) {
  const { t } = useTranslation();

  if (!value) return null;

  if (typeof value !== 'string') {
    return (
      <div className="flex h-[40px] items-center gap-xs">
        <span className="italic text-dimmed">
          {t({
            pt: 'Visualização indisponível',
            en: 'Preview unavailable',
            es: 'Vista previa no disponible',
          })}
        </span>
      </div>
    );
  }

  return (
    <HoverCard width={280} shadow="md" withArrow>
      <HoverCardTarget>
        <div className="relative flex h-[40px] items-center gap-xs">
          <div className="absolute left-0 top-0 size-full truncate">
            {value}
          </div>
        </div>
      </HoverCardTarget>
      <HoverCardDropdown>
        <Text size="sm" className="whitespace-pre-wrap">
          {value}
        </Text>
      </HoverCardDropdown>
    </HoverCard>
  );
}
