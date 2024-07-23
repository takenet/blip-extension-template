import { ScrollArea } from '@mantine/core';
import { Suspense, useEffect } from 'react';
import {
  type FieldValues,
  FormProvider,
  useForm,
  type UseFormReturn,
} from 'react-hook-form';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useLocalStorage } from '@mantine/hooks';
import { useTranslation } from 'contexts/translation-context';
import { track } from 'lib/utils/track';
import { PanelResizeHandle } from 'components/panel-resize-handle';
import { Feedback } from 'components/feedback';
import { LoadingState } from 'components/loading-state';
import { useFormTracking } from './hooks/use-form-tracking';
import { Navbar } from './components/navbar';
import { dataTypes } from './utils/data-types';

export function Home() {
  const { t } = useTranslation();

  const [active, setActive] = useLocalStorage({
    key: 'extension-data-tables-active',
    deserialize: (value) => {
      return dataTypes.some((dataType) => dataType.name === value)
        ? (value as string)
        : 'tickets';
    },
    getInitialValueInEffect: false,
    defaultValue: 'tickets',
  });

  const activeDataType = dataTypes.find((dataType) => dataType.name === active);

  const form = useForm({
    defaultValues: activeDataType?.defaultValues as FieldValues,
  }) as unknown as UseFormReturn;

  const onChangeActive = (newActive: string) => {
    const newActiveDataType = dataTypes.find(
      (dataType) => dataType.name === newActive,
    );
    form.reset(newActiveDataType?.defaultValues);
    setActive(newActive);
  };

  useEffect(() => {
    void track('page-opened', { pathname: active });
  }, [active]);

  useFormTracking(form, active);

  return (
    <FormProvider {...form}>
      <div className="h-screen">
        <Feedback
          onSubmit={(values) => {
            track('feedback', values);
          }}
        />
        <PanelGroup
          autoSaveId="extension-data-tables-panel-group-h"
          direction="horizontal"
        >
          <Panel
            defaultSize={15}
            minSize={10}
            order={1}
            id="data-tables-panel-side"
          >
            <div className="flex size-full flex-col">
              <PanelGroup
                direction="vertical"
                autoSaveId="extension-data-tables-panel-group-v"
              >
                <Panel minSize={20} order={1} id="data-tables-panel-nav">
                  <ScrollArea
                    h="100%"
                    classNames={{ viewport: '[&>div]:h-full' }}
                  >
                    <Navbar active={active} onChangeActive={onChangeActive} />
                  </ScrollArea>
                </Panel>
                {activeDataType?.form ? (
                  <>
                    <PanelResizeHandle />
                    <Panel minSize={20} order={2} id="data-tables-panel-form">
                      <ScrollArea h="100%">
                        <div className="p-sm @container">
                          <activeDataType.form key={activeDataType.name} />
                        </div>
                      </ScrollArea>
                    </Panel>
                  </>
                ) : null}
              </PanelGroup>
            </div>
          </Panel>
          <PanelResizeHandle />
          <Panel
            order={2}
            defaultSize={85}
            minSize={30}
            id="data-tables-panel-main"
          >
            <div className="flex size-full">
              <Suspense
                fallback={
                  <LoadingState
                    title={t({
                      pt: 'Carregando UI',
                      en: 'Loading UI',
                      es: 'Cargando UI',
                    })}
                  />
                }
              >
                {activeDataType?.table ? (
                  <activeDataType.table key={activeDataType.name} />
                ) : null}
              </Suspense>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </FormProvider>
  );
}
