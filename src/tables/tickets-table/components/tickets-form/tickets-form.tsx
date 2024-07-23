import { FormProvider, useFormContext } from 'react-hook-form';
import { eq, getTeams, type GetTeamsItem } from 'blip-iframe';
import { Title } from '@mantine/core';
import { useTranslation } from 'contexts/translation-context';
import { NumberTagsInput } from 'components/number-tags-input';
import AsyncMultiSelect from 'components/async-multi-select';
import DateRangeInput from 'components/date-range-input';
import AttendantSelect from './components/attendant-select';
import { StatusSelect } from './components/status-select';
import ContactSelect from './components/contact-select';

export default function TicketsForm() {
  const form = useFormContext();
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <div className="flex flex-col">
        <Title size="h4">
          {t({
            pt: 'Filtrar tickets',
            en: 'Filter tickets',
            es: 'Filtrar tickets',
          })}
        </Title>
        <form className="grid grid-cols-1 gap-x-xs @md:grid-cols-2">
          <AttendantSelect />
          <ContactSelect />
          <NumberTagsInput label="Id" name="sequentialId" size="xs" />
          <StatusSelect name="status" size="xs" />
          <AsyncMultiSelect
            label={t({ pt: 'Fila', en: 'Queue', es: 'Cola' })}
            queryFn={async (search) => {
              const response = await getTeams({
                filter: search ? `(${eq('name', search)})` : undefined,
              });
              if (!response.success) {
                throw response.error;
              }
              return response.data.items;
            }}
            parseOption={(data: GetTeamsItem) => ({
              value: data.name,
              label: data.name,
            })}
            name="team"
            size="xs"
            clearable
          />
          <DateRangeInput
            name="storageDate"
            label={t({
              pt: 'Data de armazenamento',
              en: 'Storage date',
              es: 'Fecha de almacenamiento',
            })}
            size="xs"
          />
          <DateRangeInput
            name="openDate"
            label={t({
              pt: 'Data de abertura',
              en: 'Opening date',
              es: 'Fecha de apertura',
            })}
            size="xs"
          />
          <DateRangeInput
            name="closeDate"
            label={t({
              pt: 'Data de fechamento',
              en: 'Closing date',
              es: 'Fecha de cierre',
            })}
            size="xs"
          />
          <DateRangeInput
            name="statusDate"
            label={t({
              pt: 'Data do status',
              en: 'Status date',
              es: 'Fecha de estado',
            })}
            size="xs"
          />
        </form>
      </div>
    </FormProvider>
  );
}
