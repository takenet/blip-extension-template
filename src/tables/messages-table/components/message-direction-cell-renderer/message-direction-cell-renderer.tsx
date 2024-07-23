import {
  type BaseIcon,
  MessageReceivedOutline,
  MessageSentOutline,
} from '@blip-ds/react-icons';
import { Badge, type DefaultMantineColor } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import { useTranslation } from 'contexts/translation-context';

export function MessageDirectionCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, 'sent' | 'received'>) {
  const { t } = useTranslation();

  if (!value) return null;

  return (
    <div className="flex h-[40px] items-center gap-xs">
      {value === 'sent' ? (
        <DirectionBadge
          color="green"
          label={t({
            pt: 'Enviada',
            en: 'Sent',
            es: 'Enviada',
          })}
          icon={MessageSentOutline}
        />
      ) : (
        <DirectionBadge
          color="blue"
          label={t({
            pt: 'Recebida',
            en: 'Received',
            es: 'Recibida',
          })}
          icon={MessageReceivedOutline}
        />
      )}
    </div>
  );
}

interface Props {
  color: DefaultMantineColor;
  label: string;
  icon: BaseIcon;
}

function DirectionBadge({ color, label, icon: Icon }: Props) {
  return (
    <Badge
      className="w-24 pr-1.5"
      variant="light"
      color={color}
      size="md"
      classNames={{
        label: 'flex items-center gap-1 justify-between grow',
      }}
    >
      <span className="mt-0.5">{label}</span>
      <Icon className="size-4 shrink-0" />
    </Badge>
  );
}
