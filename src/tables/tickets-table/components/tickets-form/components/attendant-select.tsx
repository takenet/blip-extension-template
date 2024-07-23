import { Badge, Highlight } from '@mantine/core';
import {
  eq,
  getAttendants,
  type GetAttendantsItem,
  getAttendantStatusColor,
  getAttendantStatusLabel,
} from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';
import AsyncMultiSelect from 'components/async-multi-select';
import { type RenderOptionProps } from 'components/async-multi-select/async-multi-select';

function RenderOption({
  option,
  data,
  search,
}: RenderOptionProps<GetAttendantsItem>) {
  return (
    <div className="flex w-full items-center justify-between gap-1">
      <div className="relative h-10 grow">
        <div className="absolute left-0 top-0 flex size-full flex-col">
          <Highlight className="truncate text-sm" highlight={search ?? ''}>
            {option.label}
          </Highlight>
          <div className="truncate text-xs text-dimmed">{data?.email}</div>
        </div>
      </div>
      {data?.status ? (
        <Badge
          className="shrink-0"
          color={getAttendantStatusColor(data.status)}
          variant="light"
          size="sm"
        >
          {getAttendantStatusLabel(data.status)}
        </Badge>
      ) : null}
    </div>
  );
}

export default function AttendantSelect() {
  const { t } = useTranslation();

  return (
    <AsyncMultiSelect
      label={t({ pt: 'Atendente', en: 'Attendant', es: 'Asistente' })}
      queryFn={async (search) => {
        const response = await getAttendants({
          filter: search ? `(${eq('FullName', search)})` : undefined,
        });

        if (!response.success) {
          throw response.error;
        }
        return response.data.items;
      }}
      parseOption={(data: GetAttendantsItem) => ({
        value: data.identity,
        label: data.fullName,
      })}
      name="attendant"
      size="xs"
      renderOption={RenderOption}
      clearable
    />
  );
}
