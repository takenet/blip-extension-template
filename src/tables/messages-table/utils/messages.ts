import { MessageTalkOutline } from '@blip-ds/react-icons';
import {
  getMessageStatusLabel,
  getMessageTypeLabel,
  type GetMessagesItem,
} from 'blip-iframe';
import { JsonCellRenderer } from 'components/table/cell-renderers/json-cell-renderer';
import { type DataType } from 'pages/home/utils/data-types';
import { MessagesTable } from '../messages-table';
import { MessagesForm } from '../components/messages-form';
import { messagesFormDefaultValues } from '../components/messages-form/utils/messages-form-default-values';
import { MessageDirectionCellRenderer } from '../components/message-direction-cell-renderer';
import { MessageContentCellRenderer } from '../components/message-content-cell-renderer';
import { MessageStatusCellRenderer } from '../components/message-status-cell-renderer';
import { MessageTypeCellRenderer } from '../components/message-type-cell-renderer';

export const messages: DataType<GetMessagesItem> = {
  name: 'messages',
  label: {
    plural: { pt: 'mensagens', en: 'messages', es: 'mensajes' },
    singular: { pt: 'mensagem', en: 'message', es: 'mensaje' },
  },
  description: {
    pt: 'Essas são as mensagens enviadas e recebidas na conversa relacionada ao ticket selecionado.',
    en: 'These are the messages sent and received in the conversation related to the selected ticket.',
    es: 'Estos son los mensajes enviados y recibidos en la conversación relacionada con el ticket seleccionado.',
  },
  icon: MessageTalkOutline,
  table: MessagesTable,
  form: MessagesForm,
  defaultValues: messagesFormDefaultValues,
  columns: [
    {
      field: 'direction',
      header: { pt: 'Direção', en: 'Direction', es: 'Dirección' },
      export: {
        format: (value, t) => {
          return value === 'sent'
            ? t({
                pt: 'Enviada',
                en: 'Sent',
                es: 'Enviada',
              })
            : t({
                pt: 'Recebida',
                en: 'Received',
                es: 'Recibida',
              });
        },
      },
      table: {
        cellRenderer: MessageDirectionCellRenderer,
      },
    },
    {
      field: 'type',
      header: { pt: 'Tipo', en: 'Type', es: 'Tipo' },
      export: {
        format: (value, t, language) =>
          typeof value === 'string' ? getMessageTypeLabel(value, language) : '',
        width: 200,
      },
      table: {
        cellRenderer: MessageTypeCellRenderer,
      },
    },
    {
      field: 'content',
      header: { pt: 'Conteúdo', en: 'Content', es: 'Contenido' },
      export: {
        width: 400,
        format: (value) => {
          if (!(typeof value === 'string')) {
            return '';
          }

          if (value.length > 200) {
            return `${value.slice(0, 200)}...`;
          }
          return value;
        },
      },
      table: {
        width: 300,
        cellRenderer: MessageContentCellRenderer,
      },
    },
    {
      field: 'date',
      header: { pt: 'Data', en: 'Date', es: 'Fecha' },
      export: {
        type: 'date',
        width: 150,
      },
      table: {
        type: 'date',
      },
    },
    {
      field: 'status',
      header: { pt: 'Status', en: 'Status', es: 'Estado' },
      export: {
        format: (value, t, language) => {
          return typeof value === 'string'
            ? getMessageStatusLabel(value, language)
            : '';
        },
        width: 150,
      },
      table: {
        cellRenderer: MessageStatusCellRenderer,
      },
    },
    {
      field: 'id',
      header: { pt: 'Id', en: 'Id', es: 'Id' },
      export: {
        width: 250,
      },
      table: {},
    },
    {
      field: 'metadata.#stateName',
      header: {
        pt: 'Estado do fluxo',
        en: 'Flow state',
        es: 'Estado del flujo',
      },
      export: { width: 200 },
      table: {},
    },
    {
      field: 'metadata.#previousStateName',
      header: {
        pt: 'Estado  anterior do fluxo',
        en: 'Previous flow state',
        es: 'Estado anterior del flujo',
      },
      export: { width: 200 },
      table: {},
    },
    {
      field: 'metadata',
      header: { pt: 'Metadados', en: 'Metadata', es: 'Metadatos' },
      export: false,
      table: {
        cellRenderer: JsonCellRenderer,
      },
    },
  ],
};
