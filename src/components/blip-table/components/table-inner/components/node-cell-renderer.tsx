import { type ICellRendererParams } from 'ag-grid-community';
import { RobotOutline } from '@blip-ds/react-icons';
import { useTranslation } from 'contexts/translation-context';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { AvatarCard } from 'components/avatar-card';
import { type Page } from 'hooks/use-blip-queries';

export function NodeCellRenderer<TData>({
  data,
}: ICellRendererParams<TData & { page: Page }>) {
  const { applicationsQuery, applicationQuery } = useTableContext();
  const { t } = useTranslation();

  if (applicationsQuery.isPending) {
    return null;
  }

  let shortName: string | undefined;
  if (!data) {
    shortName = undefined;
  } else if (data.page.node) {
    shortName = data.page.node.replace('@msging.net', '');
  } else {
    shortName = applicationQuery.data?.shortName;
  }

  const application = applicationsQuery.data?.items.find(
    (item) => item.shortName === shortName,
  );

  const label = application?.name ?? shortName;

  return (
    <AvatarCard
      label={
        label ?? (
          <span className="italic">
            {t({ pt: 'Sem nome', en: 'No name', es: 'Sin nombre' })}
          </span>
        )
      }
      src={application?.imageUri}
      alt={t({ pt: 'Chatbot', en: 'Chatbot', es: 'Chatbot' })}
      fallback={RobotOutline}
    />
  );
}
