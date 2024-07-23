import { RobotOutline } from '@blip-ds/react-icons';
import { type ReactNode } from 'react';
import { Code } from '@mantine/core';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { AvatarCard } from 'components/avatar-card';
import { type BlipError } from 'hooks/use-blip-queries/utils/blip-error';
import { useTranslation } from 'contexts/translation-context';

export function BlipErrorItem({ error }: { error: BlipError }) {
  const { applicationsQuery, applicationQuery } = useTableContext();
  const { t } = useTranslation();

  if (applicationsQuery.isPending) {
    return null;
  }

  let shortName: string | undefined;
  if (error.page.node) {
    shortName = error.page.node.replace('@msging.net', '');
  } else {
    shortName = applicationQuery.data?.shortName;
  }

  const application = applicationsQuery.data?.items.find(
    (item) => item.shortName === shortName,
  );

  const name = application?.name ?? shortName;

  let label: ReactNode;

  if (name === '') {
    label = (
      <span className="italic text-dimmed">
        {t({ pt: 'String vazia', en: 'Empty string', es: 'String vacía' })}
      </span>
    );
  } else if (!name) {
    label = (
      <span className="italic text-dimmed">
        {t({ pt: 'Sem nome', en: 'No name', es: 'Sin nombre' })}
      </span>
    );
  } else {
    label = name;
  }

  return (
    <div className="flex flex-col gap-1">
      <AvatarCard
        fallback={RobotOutline}
        label={
          <span className="font-bold text-black dark:text-dark-0">{label}</span>
        }
        size="sm"
        src={application?.imageUri}
        alt={t({ pt: 'Chatbot', en: 'Chatbot', es: 'Chatbot' })}
      />
      <div className="text-dimmed">
        {`${t({
          pt: 'Buscando itens',
          en: 'Fetching items',
          es: 'Buscando elementos',
        })} ${error.page.skip + 1} - ${error.page.skip + error.page.take}`}
      </div>
      <Code block className="max-h-40 whitespace-pre-wrap">
        {error.message}
      </Code>
    </div>
  );
}
