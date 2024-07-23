import { Avatar, Highlight } from '@mantine/core';
import { eq, getContacts, type GetContactsItem } from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';
import AsyncMultiSelect from 'components/async-multi-select';
import { type RenderOptionProps } from 'components/async-multi-select/async-multi-select';

function RenderOption({
  option,
  data,
  search,
}: RenderOptionProps<GetContactsItem>) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center gap-xs">
      <Avatar src={data?.photoUri} alt="contact avatar" size={28} />
      <div className="relative h-10 grow">
        <div className="absolute left-0 top-0 flex size-full flex-col">
          <Highlight className="truncate text-sm" highlight={search ?? ''}>
            {option.label}
          </Highlight>
          <div className="truncate text-xs text-dimmed">
            {data?.phoneNumber ?? (
              <span className="italic">
                {t({
                  pt: 'Sem telefone',
                  en: 'No phone',
                  es: 'Sin teléfono',
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function parseOption(data: GetContactsItem) {
  return {
    value: data.identity,
    label: data.name ?? data.identity,
  };
}

export default function ContactSelect() {
  const { t } = useTranslation();

  return (
    <AsyncMultiSelect
      label={t({ pt: 'Contato', en: 'Contact', es: 'Contacto' })}
      queryFn={async (search) => {
        const response = await getContacts({
          filter: search ? `(${eq('FullName', search)})` : undefined,
        });

        if (!response.success) {
          throw response.error;
        }
        return response.data.items;
      }}
      parseOption={parseOption}
      name="contact"
      size="xs"
      renderOption={RenderOption}
      clearable
    />
  );
}
