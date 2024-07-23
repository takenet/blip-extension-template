import { Title } from '@mantine/core';
import { useTranslation } from 'contexts/translation-context';
import { TicketSelect } from './components/tickets-select';

export function MessagesForm() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Title size="h4">
        {t({
          pt: 'Filtrar mensagens',
          en: 'Filter messages',
          es: 'Filtrar mensajes',
        })}
      </Title>
      <form className="grid grid-cols-1 gap-x-xs @md:grid-cols-2">
        <TicketSelect name="ticket" withAsterisk autoFocus />
      </form>
    </div>
  );
}
