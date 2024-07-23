import { AgentOutline } from '@blip-ds/react-icons';
import {
  Button,
  Code,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
} from '@mantine/core';
import { Warning } from '@phosphor-icons/react/dist/ssr';
import { type ColDef, type ICellRendererParams } from 'ag-grid-community';
import { type GetAttendantsItem } from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';
import { useColumnDefs } from 'components/blip-table/components/table-inner/hooks/use-column-defs';
import { Table } from 'components/table';
import { type ApplicationsItem } from 'tables/applications-table/applications-table';
import { attendants as attendantsDataType } from 'tables/attendants-table/utils/attendants';

export function AttendantsCellRenderer({
  data,
}: ICellRendererParams<ApplicationsItem>) {
  const { t } = useTranslation();
  const attendantsResponse = data?.attendants;
  const columnDefs = useColumnDefs<GetAttendantsItem>({
    columns: attendantsDataType.columns,
    hasNodeColumn: false,
  });

  if (!attendantsResponse?.success) {
    const message = !attendantsResponse
      ? "Couldn't find the attendants corresponding to this application"
      : attendantsResponse.error.message;

    const code = !attendantsResponse
      ? 0
      : (attendantsResponse.error as unknown as { code: number }).code;

    return (
      <div className="flex h-[39px] items-center">
        <HoverCard position="left" width={300}>
          <HoverCardTarget>
            <Button
              variant="light"
              color="red"
              leftSection={<Warning size="1.25rem" />}
              size="xs"
            >
              {t({
                pt: 'Erro ao carregar atendentes',
                en: 'Error loading attendants',
                es: 'Error al cargar los atendentes',
              })}
            </Button>
          </HoverCardTarget>
          <HoverCardDropdown>
            <h3 className="m-0">
              {t({
                pt: 'Erro:',
                en: 'Error:',
                es: 'Error:',
              })}
            </h3>
            <Code block className="max-h-40 whitespace-pre-wrap">
              {t({
                pt: `Código: ${code}\n`,
                en: `Code: ${code}\n`,
                es: `Código: ${code}\n`,
              })}
              {message}
            </Code>
          </HoverCardDropdown>
        </HoverCard>
      </div>
    );
  }

  const attendants = attendantsResponse.data.items;

  return (
    <div className="flex h-[39px] items-center">
      <HoverCard position="left">
        <HoverCardTarget>
          <Button
            variant="light"
            leftSection={<AgentOutline size="1.375rem" />}
            size="xs"
          >
            {`${attendants.length} ${t({
              pt: attendants.length === 1 ? 'atendente' : 'atendentes',
              en: attendants.length === 1 ? 'attendant' : 'attendants',
              es: attendants.length === 1 ? 'atendente' : 'atendentes',
            })}`}{' '}
            {t({
              pt: '(clique para ver)',
              en: '(click to view)',
              es: '(haga clic para ver)',
            })}
          </Button>
        </HoverCardTarget>
        <HoverCardDropdown
          w={600}
          h={400}
          className="flex overflow-hidden !p-0"
        >
          <Table<GetAttendantsItem>
            rowData={attendants}
            columnDefs={columnDefs as unknown as ColDef<GetAttendantsItem>[]}
            getRowId={(row) => row.data.identity}
          />
        </HoverCardDropdown>
      </HoverCard>
    </div>
  );
}
