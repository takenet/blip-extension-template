import { getContacts, type GetContactsItem } from 'blip-iframe';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useState } from 'react';
import { BlipTable, type BlipTableProps } from 'components/blip-table';
import { PanelResizeHandle } from 'components/panel-resize-handle';
import { TicketsTableInner } from 'tables/tickets-table';
import { contacts } from './utils/contacts';

export function ContactsTable() {
  const [selectedRow, setSelectedRow] = useState<GetContactsItem | null>(null);

  return (
    <PanelGroup direction="horizontal">
      <Panel minSize={20} defaultSize={50} order={1}>
        <ContactsTableInner
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </Panel>
      {selectedRow ? (
        <>
          <PanelResizeHandle className="!basis-1" />
          <Panel defaultSize={50} minSize={20} order={2}>
            <TicketsTableInner
              params={{
                contact: selectedRow.identity,
              }}
              hasNodeColumn={false}
            />
          </Panel>
        </>
      ) : null}
    </PanelGroup>
  );
}

export interface Props extends Partial<BlipTableProps<GetContactsItem>> {}

export function ContactsTableInner({ ...rest }: Props) {
  return (
    <BlipTable
      dataType={contacts}
      queryFn={async ({ node, skip, take, filter }) => {
        return await getContacts({
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
