import { getAttendants, type GetAttendantsItem } from 'blip-iframe';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useState } from 'react';
import { BlipTable, type BlipTableProps } from 'components/blip-table';
import { TicketsTableInner } from 'tables/tickets-table';
import { PanelResizeHandle } from 'components/panel-resize-handle';
import { attendants } from './utils/attendants';

export function AttendantsTable() {
  const [selectedRow, setSelectedRow] = useState<GetAttendantsItem | null>(
    null,
  );

  return (
    <PanelGroup direction="horizontal">
      <Panel minSize={20} defaultSize={50} order={1}>
        <AttendantsTableInner
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </Panel>
      {selectedRow ? (
        <>
          <PanelResizeHandle className="!basis-1" />
          <Panel defaultSize={50} minSize={20} order={2}>
            <TicketsTableInner
              params={{ attendant: selectedRow.identity }}
              hasNodeColumn={false}
            />
          </Panel>
        </>
      ) : null}
    </PanelGroup>
  );
}

export interface Props extends Partial<BlipTableProps<GetAttendantsItem>> {}

export function AttendantsTableInner({ ...rest }: Props) {
  return (
    <BlipTable
      dataType={attendants}
      queryFn={async ({ node, skip, take, filter }) => {
        return await getAttendants({
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
