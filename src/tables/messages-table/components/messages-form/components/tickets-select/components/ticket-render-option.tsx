import { Avatar, Badge, Highlight, Tooltip } from '@mantine/core';
import { getTicketStatusColor, getTicketStatusLabel } from 'blip-iframe';
import { useTranslation } from 'contexts/translation-context';
import { type RenderOptionProps } from 'components/async-multi-select/async-multi-select';
import { type TicketsItem } from '../tickets-select';

export function TicketRenderOption({
  data,
  search,
}: RenderOptionProps<TicketsItem>) {
  const { t, language } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between gap-1">
      <div className="relative h-12 grow">
        <div className="absolute left-0 top-0 flex size-full flex-col gap-1">
          <div className="flex items-center gap-xs">
            <Avatar
              src={data?.contact?.photoUri}
              alt="contact photo"
              size="sm"
            />
            {data?.contact?.name ? (
              <Highlight className="truncate text-sm" highlight={search ?? ''}>
                {data.contact.name}
              </Highlight>
            ) : (
              <div className="truncate text-sm italic text-dimmed">
                {t({
                  pt: 'Sem nome',
                  en: 'No name',
                  es: 'Sin nombre',
                })}
              </div>
            )}
          </div>
          <div className="truncate text-dimmed">
            {data?.contact?.phoneNumber ? (
              <Highlight
                className="text-xs"
                component="span"
                highlight={search ?? ''}
              >
                {data.contact.phoneNumber}
              </Highlight>
            ) : (
              <span className="text-xs italic">
                {t({
                  pt: 'Sem telefone',
                  en: 'No phone number',
                  es: 'Sin teléfono',
                })}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {data?.status ? (
          <Tooltip label={getTicketStatusLabel(data.status, language)}>
            <Badge
              className="w-24 shrink-0"
              color={getTicketStatusColor(data.status)}
              variant="light"
              size="sm"
            >
              {getTicketStatusLabel(data.status, language)}
            </Badge>
          </Tooltip>
        ) : null}
        <div className="relative h-4 grow">
          <div className="absolute left-0 top-0 flex size-full flex-col">
            <div className="truncate text-right text-xs text-dimmed">
              {`${t({ pt: 'Fila', en: 'Queue', es: 'Fila' })}: ${data?.team ?? ''}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
