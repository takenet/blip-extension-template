import { type BaseIcon } from '@blip-ds/react-icons';
import { type FieldValues } from 'react-hook-form';
import { attendants } from 'tables/attendants-table/utils/attendants';
import { contacts } from 'tables/contacts-table/utils/contacts';
import { applications } from 'tables/applications-table/utils/applications';
import { tickets } from 'tables/tickets-table/utils/tickets';
import { messages } from 'tables/messages-table/utils/messages';
import { type Column } from 'components/blip-table/types/column';

export interface DataType<TData = unknown, TTableProps = unknown> {
  name: string;
  label: {
    plural: { pt: string; en: string; es: string };
    singular: { pt: string; en: string; es: string };
  };
  description: {
    pt: string;
    en: string;
    es: string;
  };
  icon: BaseIcon;
  table: (props: TTableProps) => JSX.Element;
  form?: () => JSX.Element;
  defaultValues?: FieldValues;
  columns: Column<TData>[];
}

export const dataTypes = [
  tickets,
  attendants,
  contacts,
  applications,
  messages,
];
