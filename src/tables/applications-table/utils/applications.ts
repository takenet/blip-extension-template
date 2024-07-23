import { RobotOutline } from '@blip-ds/react-icons';
import { type DataType } from 'pages/home/utils/data-types';
import { ApplicationCellRenderer } from '../components/application-cell-renderer';
import { ApplicationTemplateCellRenderer } from '../components/application-template-cell-renderer';
import {
  ApplicationsTable,
  type ApplicationsItem,
} from '../applications-table';
import { AttendantsCellRenderer } from '../components/application-cell-renderer/attendants-cell-renderer';

export const applications: DataType<ApplicationsItem> = {
  name: 'applications',
  label: {
    plural: { pt: 'chatbots', en: 'chatbots', es: 'chatbots' },
    singular: { pt: 'chatbot', en: 'chatbot', es: 'chatbot' },
  },
  description: {
    pt: 'Esses são os chatbots nesse contrato.',
    en: 'These are the chatbots in this contract.',
    es: 'Estos son los chatbots en este contrato.',
  },
  icon: RobotOutline,
  table: ApplicationsTable,
  columns: [
    {
      field: 'name',
      header: { pt: 'Nome', en: 'Name', es: 'Nombre' },
      export: {
        width: 200,
      },
      table: {
        initialWidth: 250,
        cellRenderer: ApplicationCellRenderer,
      },
    },
    {
      field: 'shortName',
      header: { pt: 'Identificador', en: 'Identifier', es: 'Identificador' },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'description',
      header: { pt: 'Descrição', en: 'Description', es: 'Descripción' },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'template',
      header: { pt: 'Template', en: 'Template', es: 'Template' },
      export: {
        format: (value) => (value === 'master' ? 'Router' : 'Builder'),
      },
      table: {
        cellRenderer: ApplicationTemplateCellRenderer,
      },
    },
    {
      field: 'tenantId',
      header: {
        pt: 'ID do contrato',
        en: 'Contract ID',
        es: 'ID del contrato',
      },
      export: {
        width: 150,
      },
      table: {},
    },
    {
      field: 'created',
      header: { pt: 'Criado em', en: 'Created at', es: 'Creado en' },
      export: {
        type: 'date',
        width: 150,
      },
      table: { type: 'date' },
    },
    {
      field: 'updated',
      header: { pt: 'Atualizado em', en: 'Updated at', es: 'Actualizado en' },
      export: {
        type: 'date',
        width: 150,
      },
      table: { type: 'date' },
    },
    {
      field: 'hasPermission',
      header: {
        pt: 'Tem permissão',
        en: 'Has permission',
        es: 'Tiene permiso',
      },
      export: {
        type: 'boolean',
      },
      table: { type: 'boolean' },
    },
    {
      field: 'emailOwner',
      header: {
        pt: 'Email do dono',
        en: 'Owner email',
        es: 'Email del propietario',
      },
      export: {
        width: 200,
      },
      table: {},
    },
    {
      field: 'imageUri',
      header: { pt: 'Imagem', en: 'Image', es: 'Imagen' },
      export: false,
      table: false,
    },
    {
      field: 'attendants',
      header: { pt: 'Atendentes', en: 'Attendants', es: 'Asistentes' },
      export: false,
      table: {
        initialWidth: 250,
        cellRenderer: AttendantsCellRenderer,
      },
    },
  ],
};
