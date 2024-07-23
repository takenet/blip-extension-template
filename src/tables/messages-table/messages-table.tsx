import { getMessages, type GetMessagesItem } from 'blip-iframe';
import { TicketOutline } from '@blip-ds/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'contexts/translation-context';
import { BlipTable, type BlipTableProps } from 'components/blip-table';
import { type Page } from 'hooks/use-blip-queries';
import { messages } from './utils/messages';

export function MessagesTable() {
  const ticketId = useWatch<{ ticket: string | undefined }, 'ticket'>({
    name: 'ticket',
  });

  return <MessagesTableInner ticketId={ticketId} />;
}

export interface Props extends Partial<BlipTableProps<GetMessagesItem>> {
  ticketId: string | undefined;
}

export function MessagesTableInner({ ticketId, ...rest }: Props) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return (
    <BlipTable
      dataType={messages}
      dependencies={[
        {
          name: 'ticketId',
          value: ticketId,
          label: t({ pt: 'ticket', en: 'ticket', es: 'ticket' }),
          icon: TicketOutline,
        },
      ]}
      queryFn={async ({ skip, take, filter, node }) => {
        if (!ticketId) throw new Error('Ticket ID is required');

        let messageId;
        let storageDate;

        if (skip !== 0) {
          const previousResponse = queryClient.getQueryData<{
            items: GetMessagesItem[];
            page: Page;
          }>(['messages', ticketId, node, take, skip - take, filter]);

          if (!previousResponse) {
            throw new Error(
              'Previous response not found. It is necessary to correctly paginate messages.',
            );
          }

          if (previousResponse.items.length === 0) {
            throw new Error(
              'Previous response is empty. It is necessary to correctly paginate messages.',
            );
          }

          const lastItem =
            previousResponse.items[previousResponse.items.length - 1];

          messageId = lastItem.id;
          storageDate = lastItem.date;
        }

        return await getMessages({
          ticketId,
          prefix: node ? `lime://${node}/` : undefined,
          params: {
            $take: take,
            direction: 'desc',
            getFromOwnerIfTunnel: true,
            getMergedThreadMessage: true,
            getExternalMessages: false,
            messageId,
            storageDate,
          },
        });
      }}
      {...rest}
    />
  );
}
