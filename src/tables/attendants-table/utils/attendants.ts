import { AgentOutline } from '@blip-ds/react-icons';
import { type GetAttendantsItem } from 'blip-iframe';
import { AttendantStatusCellRenderer } from 'components/table/cell-renderers/attendant-status-cell-renderer';
import { type DataType } from 'pages/home/utils/data-types';
import { AttendantsTable } from '../attendants-table';

export const attendants: DataType<GetAttendantsItem> = {
  name: 'attendants',
  label: {
    plural: { pt: 'atendentes', en: 'attendants', es: 'atendentes' },
    singular: { pt: 'atendente', en: 'attendant', es: 'atendente' },
  },
  description: {
    pt: 'Esses são os atendentes cadastrados neste bot. Caso este bot seja um router, os atendentes de todos os subbots também serão exibidos.',
    en: 'These are the attendants registered in this bot. If this bot is a router, the attendants of all subbots will also be displayed.',
    es: 'Estos son los atendentes registrados en este bot. Si este bot es un router, también se mostrarán los atendentes de todos los subbots.',
  },
  icon: AgentOutline,
  table: AttendantsTable,
  columns: [
    {
      field: 'fullName',
      header: {
        pt: 'Nome',
        en: 'Name',
        es: 'Nombre',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'email',
      header: {
        pt: 'E-mail',
        en: 'E-mail',
        es: 'Correo electrónico',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'status',
      header: {
        pt: 'Status',
        en: 'Status',
        es: 'Status',
      },
      export: {
        width: 200,
      },
      table: {
        cellRenderer: AttendantStatusCellRenderer,
      },
    },
    {
      field: 'teams',
      header: {
        pt: 'Filas',
        en: 'Queues',
        es: 'Colas',
      },
      export: {
        type: 'string-array',
        width: 200,
      },
      table: {},
    },
    {
      field: 'identity',
      header: {
        pt: 'Identificador',
        en: 'Identifier',
        es: 'Identificador',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'isEnabled',
      header: {
        pt: 'Habilitado',
        en: 'Enabled',
        es: 'Habilitado',
      },
      export: {
        type: 'boolean',
      },
      table: {
        type: 'boolean',
      },
    },
    {
      field: 'agentSlots',
      header: {
        pt: 'Slots',
        en: 'Slots',
        es: 'Slots',
      },
      export: {
        type: 'number',
      },
      table: {},
    },
    {
      field: 'lastServiceDate',
      header: {
        pt: 'Último atendimento',
        en: 'Last service',
        es: 'Último servicio',
      },
      export: {
        type: 'date',
        width: 150,
      },
      table: {
        type: 'date',
      },
    },
  ],
};
