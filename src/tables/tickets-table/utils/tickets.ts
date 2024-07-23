import { TicketOutline } from '@blip-ds/react-icons';
import { getTicketStatusLabel, type GetTicketsItem } from 'blip-iframe';
import { type DataType } from 'pages/home/utils/data-types';
import { TicketsTable } from '../tickets-table';
import TicketsForm from '../components/tickets-form/tickets-form';
import { ticketsFormDefaultValues } from '../components/tickets-form/utils/tickets-form-default-values';
import { TicketStatusCellRenderer } from '../components/ticket-status-cell-renderer';

export const tickets: DataType<GetTicketsItem> = {
  name: 'tickets',
  label: {
    plural: { pt: 'tickets', en: 'tickets', es: 'tickets' },
    singular: { pt: 'ticket', en: 'ticket', es: 'ticket' },
  },
  description: {
    pt: 'Esses são os tickets de atendimento (transbordo) neste bot. Se esse bot for um router, os tickets de todos os subbots também serão exibidos.',
    en: 'These are the service tickets (overflow) in this bot. If this bot is a router, the tickets of all subbots will also be displayed.',
    es: 'Estos son los tickets de atención (desbordamiento) en este bot. Si este bot es un router, también se mostrarán los tickets de todos los subbots.',
  },
  icon: TicketOutline,
  table: TicketsTable,
  form: TicketsForm,
  defaultValues: ticketsFormDefaultValues,
  columns: [
    {
      field: 'sequentialId',
      header: {
        pt: 'ID Sequencial',
        en: 'Sequential ID',
        es: 'ID Secuencial',
      },
      export: {
        format: (value) => {
          return typeof value === 'number' ? `#${value}` : '';
        },
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
        format: (value, t, language) => {
          return typeof value === 'string'
            ? getTicketStatusLabel(value, language)
            : '';
        },
      },
      table: {
        width: 225,
        cellRenderer: TicketStatusCellRenderer,
      },
    },
    {
      field: 'openDate',
      header: {
        pt: 'Data de abertura',
        en: 'Opening date',
        es: 'Fecha de apertura',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'closeDate',
      header: {
        pt: 'Data de fechamento',
        en: 'Closing date',
        es: 'Fecha de cierre',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'team',
      header: {
        pt: 'Fila',
        en: 'Queue',
        es: 'Cola',
      },
      export: {},
      table: {},
    },
    {
      field: 'rating',
      header: {
        pt: 'Avaliação',
        en: 'Rating',
        es: 'Calificación',
      },
      export: { type: 'number' },
      table: {},
    },
    {
      field: 'agentIdentity',
      header: {
        pt: 'ID do atendente',
        en: 'Agent ID',
        es: 'ID del agente',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'storageDate',
      header: {
        pt: 'Data de armazenamento',
        en: 'Storage date',
        es: 'Fecha de almacenamiento',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'statusDate',
      header: {
        pt: 'Data do status',
        en: 'Status date',
        es: 'Fecha del estado',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'externalId',
      header: {
        pt: 'ID externo',
        en: 'External ID',
        es: 'ID externo',
      },
      export: false,
      table: {},
    },
    {
      field: 'unreadMessages',
      header: {
        pt: 'Mensagens não lidas',
        en: 'Unread messages',
        es: 'Mensajes no leídos',
      },
      export: false,
      table: {},
    },
    {
      field: 'closed',
      header: {
        pt: 'Fechado',
        en: 'Closed',
        es: 'Cerrado',
      },
      export: {
        type: 'boolean',
      },
      table: { type: 'boolean' },
    },
    {
      field: 'closedBy',
      header: {
        pt: 'Fechado por',
        en: 'Closed by',
        es: 'Cerrado por',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'firstResponseDate',
      header: {
        pt: 'Data da primeira resposta',
        en: 'First response date',
        es: 'Fecha de la primera respuesta',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'priority',
      header: {
        pt: 'Prioridade',
        en: 'Priority',
        es: 'Prioridad',
      },
      export: { type: 'number' },
      table: {},
    },
    {
      field: 'isAutomaticDistribution',
      header: {
        pt: 'Distribuição automática',
        en: 'Automatic distribution',
        es: 'Distribución automática',
      },
      export: false,
      table: { type: 'boolean' },
    },
    {
      field: 'provider',
      header: {
        pt: 'Provedor',
        en: 'Provider',
        es: 'Proveedor',
      },
      export: false,
      table: {},
    },
    {
      field: 'id',
      header: {
        pt: 'Identificador',
        en: 'Identifier',
        es: 'Identificador',
      },
      export: false,
      table: {},
    },
    {
      field: 'ownerIdentity',
      header: {
        pt: 'ID do proprietário',
        en: 'Owner ID',
        es: 'ID del propietario',
      },
      export: false,
      table: {},
    },
    {
      field: 'customerIdentity',
      header: {
        pt: 'ID do contato',
        en: 'Contact ID',
        es: 'ID del contacto',
      },
      export: false,
      table: {},
    },
    {
      field: 'customerDomain',
      header: {
        pt: 'Domínio do contato',
        en: 'Contact domain',
        es: 'Dominio del contacto',
      },
      export: false,
      table: {},
    },
    {
      field: 'distributionType',
      header: {
        pt: 'Tipo de distribuição',
        en: 'Distribution type',
        es: 'Tipo de distribución',
      },
      export: false,
      table: {},
    },
  ],
};
