import { type ICellRendererParams } from 'ag-grid-community';
import { ContactOutline } from '@blip-ds/react-icons';
import { type GetContactsItem } from 'blip-iframe';
import { type ReactNode } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { type Page } from 'hooks/use-blip-queries';
import { AvatarCard } from 'components/avatar-card';

export function ContactAvatarCellRenderer({
  data,
}: ICellRendererParams<GetContactsItem & { page: Page }>) {
  const { t } = useTranslation();

  let label: ReactNode;

  if (data?.name === '') {
    label = (
      <span className="italic text-dimmed">
        {t({ pt: 'String vazia', en: 'Empty string', es: 'String vacía' })}
      </span>
    );
  } else if (!data?.name) {
    label = (
      <span className="italic text-dimmed">
        {t({ pt: 'Sem nome', en: 'No name', es: 'Sin nombre' })}
      </span>
    );
  } else {
    label = data.name;
  }

  return (
    <AvatarCard
      label={label}
      src={data?.photoUri}
      alt={t({ pt: 'Contato', en: 'Contact', es: 'Contact' })}
      fallback={ContactOutline}
    />
  );
}
