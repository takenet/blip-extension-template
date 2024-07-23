import {
  getContacts,
  type GetContactsItem,
  type GetTicketsItem,
} from 'blip-iframe';
import { type FieldValues } from 'react-hook-form';
import { useTranslation } from 'contexts/translation-context';
import { AsyncSelect, type AsyncSelectProps } from 'components/async-select-2';
import { useBlipQueries } from 'hooks/use-blip-queries';
import { useNodes } from 'hooks/use-nodes';
import { queryFn } from './utils/query-fn';
import { TicketRenderOption } from './components/ticket-render-option';

export interface TicketsItem extends GetTicketsItem {
  contact?: GetContactsItem;
}

type Props<TFieldValues extends FieldValues> = Omit<
  AsyncSelectProps<TFieldValues, TicketsItem>,
  'queryFn' | 'parseOption' | 'renderOption'
>;

export function TicketSelect<TFieldValues extends FieldValues>({
  ...rest
}: Props<TFieldValues>) {
  const { t } = useTranslation();
  const nodes = useNodes();

  const contactQueries = useBlipQueries({
    queryKey: ['contacts'],
    queryFn: ({ skip, take, filter, node }) => {
      return getContacts({
        prefix: node ? `lime://${node}/` : undefined,
        skip,
        take,
        filter,
      });
    },
    nodes,
    autoFetch: 10,
  });

  contactQueries;

  return (
    <AsyncSelect
      label={t({ pt: 'Ticket', en: 'Ticket', es: 'Ticket' })}
      queryFn={queryFn}
      parseOption={(data: TicketsItem) => ({
        value: data.id,
        label: `#${data.sequentialId} - ${
          data.contact?.name ??
          t({ pt: 'Sem nome', en: 'No name', es: 'Sin nombre' })
        } - ${
          data.contact?.phoneNumber ??
          t({ pt: 'Sem telefone', en: 'No phone number', es: 'Sin teléfono' })
        }`,
      })}
      size="xs"
      renderOption={TicketRenderOption}
      clearable
      {...rest}
    />
  );
}
