import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { getTickets, type GetTicketsItem } from 'blip-iframe';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useState } from 'react';
import { BlipTable, type BlipTableProps } from 'components/blip-table';
import { useFilter } from 'hooks/use-filter';
import { PanelResizeHandle } from 'components/panel-resize-handle';
import { MessagesTableInner } from 'tables/messages-table';
import { ticketsFormSchema } from './components/tickets-form/utils/tickets-form-schema';
import {
  type GetTicketFilters,
  getTicketsFilters,
} from './components/tickets-form/utils/get-tickets-filters';
import { tickets } from './utils/tickets';

export function TicketsTable() {
  const [selectedRow, setSelectedRow] = useState<GetTicketsItem | null>(null);

  const _filter = useFilter({
    schema: ticketsFormSchema,
    getter: getTicketsFilters,
  });

  return (
    <PanelGroup direction="horizontal">
      <Panel minSize={20} defaultSize={50} order={1}>
        <TicketsTableInner
          filter={_filter}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </Panel>
      {selectedRow ? (
        <>
          <PanelResizeHandle className="!basis-1" />
          <Panel defaultSize={50} minSize={20} order={2}>
            <MessagesTableInner
              ticketId={selectedRow.id}
              hasNodeColumn={false}
            />
          </Panel>
        </>
      ) : null}
    </PanelGroup>
  );
}

export interface Props extends Partial<BlipTableProps<GetTicketsItem>> {
  params?: GetTicketFilters;
}

export function TicketsTableInner({ params, ...rest }: Props) {
  return (
    <BlipTable
      dataType={tickets}
      filter={params ? getTicketsFilters(params) : undefined}
      queryFn={async ({ node, skip, take, filter }) => {
        return await getTickets({
          prefix: node ? `lime://${node}/` : undefined,
          skip,
          take,
          filter,
        });
      }}
      {...rest}
    />
  );
}
