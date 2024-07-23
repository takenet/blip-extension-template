import { type ICellRendererParams } from 'ag-grid-community';
import { RobotOutline } from '@blip-ds/react-icons';
import { useTranslation } from 'contexts/translation-context';
import { AvatarCard } from 'components/avatar-card';
import { type ApplicationsItem } from 'tables/applications-table';

export function ApplicationCellRenderer({
  data,
}: ICellRendererParams<ApplicationsItem>) {
  const { t } = useTranslation();

  const label = data?.name ?? data?.shortName;

  return (
    <AvatarCard
      label={
        label ?? (
          <span className="italic">
            {t({ pt: 'Sem nome', en: 'No name', es: 'Sin nombre' })}
          </span>
        )
      }
      src={data?.imageUri}
      alt={t({ pt: 'Chatbot', en: 'Chatbot', es: 'Chatbot' })}
      fallback={RobotOutline}
    />
  );
}
