import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Anchor, ScrollArea, Text } from '@mantine/core';
import { TicketOutline } from '@blip-ds/react-icons';
import { AreaChart } from '@mantine/charts';
import { useTranslation } from 'contexts/translation-context';
import { DateRangePicker } from './components/DateRangePicker';
import { LocalStorageUpdater } from './components/LocalStorageUpdater';
import { MetricWrapper } from './components/MetricWrapper';
import { NumberMetrics } from './components/NumberMetrics';
import { parseNumber } from './utils/parseNumber';
import { data } from './data';

const LOCAL_STORAGE_KEY = 'desk-addons-metrics-form-values';

const defaultValues = {
  range: {
    name: 'today',
    dates: [dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()],
  },
};

export function getDefaultValues() {
  const savedValues = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedValues) {
    try {
      return JSON.parse(savedValues) as typeof defaultValues;
    } catch {
      return defaultValues;
    }
  }

  return defaultValues;
}

export function Metrics() {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: getDefaultValues(),
  });

  return (
    <FormProvider {...form}>
      <div
        style={{
          width: '600px',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LocalStorageUpdater name={LOCAL_STORAGE_KEY} />
        <DateRangePicker name="range" />
        <ScrollArea h="calc(100dvh - 40px)">
          <div className="flex flex-col px-xs pb-xs">
            <div className="grid grid-cols-3 gap-xs">
              <MetricWrapper className="col-span-3 aspect-[3/1] pb-2 pr-6 pt-4">
                <AreaChart
                  h="100%"
                  data={data}
                  dataKey="date"
                  series={[
                    { name: 'Apples', color: 'indigo.6' },
                    { name: 'Oranges', color: 'blue.6' },
                    { name: 'Tomatoes', color: 'teal.6' },
                  ]}
                  curveType="natural"
                  tickLine="xy"
                />
              </MetricWrapper>
              <NumberMetrics
                color="grape"
                label="Tickets"
                description="TODO"
                icon={TicketOutline}
                data={[
                  {
                    value: 1.125679,
                    label: t({ en: 'Missed', es: 'Perdidos', pt: 'Perdidos' }),
                    color: 'red',
                    description: t({
                      en: 'Tickets that were closed by customers while they were still waiting in queue',
                      es: 'Tickets cerrados por el cliente mientras estaba esperando en la cola de servicio',
                      pt: 'Tickets encerrados pelo cliente enquanto ele ainda aguardava na fila de atendimento',
                    }),
                  },
                  {
                    value: 999,
                    label: t({
                      en: 'Withdrawn',
                      es: 'Abandonados',
                      pt: 'Abandonados',
                    }),
                    color: 'orange',
                    description: t({
                      en: 'Tickets abandoned due to inactivity or closed manually by the customer after being assigned to an agent',
                      es: 'Tickets cerrados por inactividad o manualmente por el cliente después de haber sido asignado a un asistente',
                      pt: 'Tickets encerrados por inatividade ou de forma manual pelo cliente depois de ser atribuído a um atendente',
                    }),
                  },
                  {
                    value: 12345,
                    label: t({
                      en: 'Finalized',
                      es: 'Completados',
                      pt: 'Finalizados',
                    }),
                    color: 'green',
                    description: t({
                      en: 'Tickets that were manually closed by the agent or manager. Includes those that were transferred to another queue or agent',
                      es: 'Tickets que han sido terminados manualmente por el asistente o el gestor. Incluye los que se transfirieron a otra cola o a otro asistente',
                      pt: 'Tickets que foram finalizados de forma manual pelo atendente ou gestor. Inclui aqueles que foram transferidos para outra fila ou atendente',
                    }),
                  },
                  {
                    value: 51235678900,
                    label: t({ en: 'Closed', es: 'Cerrados', pt: 'Fechados' }),
                    color: 'blue',
                    description: t({
                      en: "Total of missed, withdrawn and finalized tickets. Doesn't include withdrawn tickets that are still on the agent's screen",
                      es: 'Total de tickets perdidos, abandonados y completados. No incluye los tickets abandonados que siguen en la ventana del asistente',
                      pt: 'Total de tickets perdidos, abandonados e concluídos. Não considera os tickets abandonados que ainda estão na tela do atendente',
                    }),
                  },
                ]}
              />
              <Metric value={1.125679} />
              <Metric value={999} />
              <Metric value={123456} />
              <Metric value={51264567} />
              <Metric value={51235678900} />
            </div>
            <Text mt="auto" pt="xs" size="xs" ta="center" c="dimmed">
              {t({
                pt: 'Não encontrou o que precisa?',
                en: "Didn't find what you need?",
                es: '¿No encontró lo que necesita?',
              })}
              <br />
              <Anchor component="button" type="button">
                {t({
                  pt: 'Pedir um nova métrica',
                  en: 'Request new metric',
                  es: 'Solicitar una nueva métrica',
                })}
              </Anchor>
            </Text>
          </div>
        </ScrollArea>
      </div>
    </FormProvider>
  );
}

// 1105213
// R$ 1008.72

function Metric({ value }: { value: number }) {
  return (
    <MetricWrapper className="flex aspect-square items-center justify-center">
      <Text className="truncate" size="28px" fw="bold">
        {parseNumber(value)}
      </Text>
    </MetricWrapper>
  );
}
