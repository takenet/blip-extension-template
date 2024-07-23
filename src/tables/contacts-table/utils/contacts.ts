import type { GetContactsItem } from 'blip-iframe';
import { ContactOutline } from '@blip-ds/react-icons';
import { type DataType } from 'pages/home/utils/data-types';
import { ContactAvatarCellRenderer } from '../components/contact-avatar-cell-renderer';
import { TenantsCellRenderer } from '../components/tenants-cell-renderer';
import { ContactsTable } from '../contacts-table';

export const contacts: DataType<GetContactsItem> = {
  name: 'contacts',
  label: {
    plural: { pt: 'contatos', en: 'contacts', es: 'contactos' },
    singular: { pt: 'contato', en: 'contact', es: 'Contacto' },
  },
  description: {
    pt: 'Esses são os contatos cadastrados neste bot. Caso este bot seja um router, os contatos de todos os subbots também serão exibidos.',
    en: 'These are the contacts registered in this bot. If this bot is a router, the contacts of all subbots will also be displayed.',
    es: 'Estos son los contactos registrados en este bot. Si este bot es un router, también se mostrarán los contactos de todos los subbots.',
  },
  icon: ContactOutline,
  table: ContactsTable,
  columns: [
    {
      field: 'name',
      header: {
        pt: 'Nome',
        en: 'Name',
        es: 'Nombre',
      },
      export: { width: 150 },
      table: {
        cellRenderer: ContactAvatarCellRenderer,
      },
    },
    {
      field: 'email',
      header: {
        pt: 'E-mail',
        en: 'E-mail',
        es: 'Correo electrónico',
      },
      export: { width: 200 },
      table: {},
    },
    {
      field: 'group',
      header: {
        pt: 'Grupo',
        en: 'Group',
        es: 'Grupo',
      },
      export: {},
      table: {},
    },
    {
      field: 'lastMessageDate',
      header: {
        pt: 'Última mensagem',
        en: 'Last message',
        es: 'Último mensaje',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'lastUpdateDate',
      header: {
        pt: 'Última atualização',
        en: 'Last update',
        es: 'Última actualización',
      },
      export: { width: 150, type: 'date' },
      table: { type: 'date' },
    },
    {
      field: 'source',
      header: {
        pt: 'Origem',
        en: 'Source',
        es: 'Origen',
      },
      export: {},
      table: {},
    },
    {
      field: 'phoneNumber',
      header: {
        pt: 'Telefone',
        en: 'Phone',
        es: 'Teléfono',
      },
      export: { width: 150 },
      table: {},
    },
    {
      field: 'culture',
      header: {
        pt: 'Locale',
        en: 'Locale',
        es: 'Localidad',
      },
      export: {},
      table: {},
    },
    {
      field: 'extras.isTestersGroup',
      header: {
        pt: 'É Testador',
        en: 'Is Tester',
        es: 'Es Tester',
      },
      export: {
        type: 'boolean',
      },
      table: {
        valueGetter: (params) => {
          const isTestersGroup = params.data?.extras?.isTestersGroup;
          return isTestersGroup === 'True';
        },
        type: 'boolean',
      },
    },
    {
      field: 'extras.typeOfCompile',
      header: {
        pt: 'Tipo de Compilação',
        en: 'Compile Type',
        es: 'Tipo de Compilación',
      },
      export: { width: 150 },
      table: {},
    },
    {
      field: 'extras.lastUsedTenants',
      header: {
        pt: 'Últimos contratos',
        en: 'Last contracts',
        es: 'Últimos contratos',
      },
      export: { width: 150 },
      table: {
        cellRenderer: TenantsCellRenderer,
        initialWidth: 250,
      },
    },
    {
      field: 'extras',
      header: {
        pt: 'Extras',
        en: 'Extras',
        es: 'Extras',
      },
      export: false,
      table: false,
    },
    {
      field: 'city',
      header: {
        pt: 'Cidade',
        en: 'City',
        es: 'Ciudad',
      },
      export: false,
      table: false,
    },
    {
      field: 'identity',
      header: {
        pt: 'Identificador',
        en: 'Identifier',
        es: 'Identificador',
      },
      export: { width: 400 },
      table: {},
    },
  ],
};
