import { Badge } from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import { useTranslation } from 'contexts/translation-context';

export function ApplicationTemplateCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, string>) {
  const { t } = useTranslation();

  if (!value) return null;

  const isRouter = value === 'master';

  return (
    <div className="flex h-[40px] items-center gap-xs">
      <Badge variant="light" color={isRouter ? 'grape' : 'blue'}>
        {isRouter
          ? t({ en: 'Router', pt: 'Roteador', es: 'Enrutador' })
          : 'Builder'}
      </Badge>
    </div>
  );
}
