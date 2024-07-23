import { type BaseIcon } from '@blip-ds/react-icons';
import { type ReactNode } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { EmptyState } from 'components/empty-state';

interface Props {
  icon?: ReactNode;
  iconComponent?: BaseIcon;
  label: string;
  article?: {
    pt: string;
    en: string;
    es: string;
  };
}

export function NoneSelectedState({
  icon,
  iconComponent: IconComponent,
  label,
  article = {
    pt: 'um',
    en: 'a',
    es: 'un',
  },
}: Props) {
  const { t } = useTranslation();

  return (
    <EmptyState
      icon={
        icon ? icon : IconComponent ? <IconComponent size={38} /> : undefined
      }
      title={t({
        pt: `Nenhum ${label} selecionado`,
        en: `No ${label} selected`,
        es: `No se ${label} ningún ticket`,
      })}
      description={t({
        pt: `Selecione ${article.pt} ${label} da lista ao lado para ver suas mensagens`,
        en: `Select ${article.en} ${label} from the list on the left to view its messages`,
        es: `Seleccione ${article.es} ${label} de la lista de la izquierda para ver sus mensajes`,
      })}
    />
  );
}
