import { WarningOutline } from '@blip-ds/react-icons';
import {
  ActionIcon,
  Divider,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  ScrollAreaAutosize,
  Tooltip,
} from '@mantine/core';
import { useState } from 'react';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { type BlipError } from 'hooks/use-blip-queries/utils/blip-error';
import { useTranslation } from 'contexts/translation-context';
import { BlipErrorItem } from './components/blip-error-item';

export function ErrorsButton() {
  const [opened, setOpened] = useState(false);
  const { queries } = useTableContext();
  const { t } = useTranslation();

  const hasErrors = queries.some((query) => query.isError);

  if (!hasErrors) {
    return null;
  }

  const errors = queries
    .map((query) => query.error)
    .filter(Boolean) as BlipError[];

  return (
    <Popover
      width={500}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <PopoverTarget>
        <Tooltip
          label={t({
            pt: `Ocorreu erros em uma ou mais requisições`,
            en: `There were errors in one or more requests`,
            es: `Hubo errores en una o más solicitudes`,
          })}
          disabled={opened}
        >
          <ActionIcon variant="tertiary" onClick={() => setOpened((o) => !o)}>
            <WarningOutline size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      </PopoverTarget>
      <PopoverDropdown p={0}>
        <ScrollAreaAutosize mah="calc(100vh - 70px)">
          <div className="flex flex-col p-md">
            <div className="flex flex-col text-sm">
              {errors.map((error) => {
                return (
                  <div
                    className="flex flex-col"
                    key={`${error.page.node}${error.page.skip}${error.page.take}${error.page.filter}`}
                  >
                    <BlipErrorItem error={error} />
                    <Divider my="md" />
                  </div>
                );
              })}
            </div>
            <div className="text-center text-sm text-dimmed">
              {t({
                pt: 'Esses erros nem sempre indicam um problema; eles podem ocorrer naturalmente devido a problemas de acesso ou solicitações de bot de roteador.',
                en: "These errors don't always indicate a problem; they can naturally occur due to access issues or router bot requests.",
                es: 'Estos errores no siempre indican un problema; pueden ocurrir naturalmente debido a problemas de acceso o solicitudes de bot de router.',
              })}
            </div>
          </div>
        </ScrollAreaAutosize>
      </PopoverDropdown>
    </Popover>
  );
}
