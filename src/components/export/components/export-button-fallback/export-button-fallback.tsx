import { ActionIconGroup, type ActionIconProps, Tooltip } from '@mantine/core';
import { useTranslation } from 'contexts/translation-context';
import { MainExportButton } from '../main-export-button';
import { MenuExportButton } from '../menu-export-button';

interface ExportButtonFallbackProps
  extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {
  defaultFormat?: string;
}

export function ExportButtonFallback({
  defaultFormat,
  ...rest
}: ExportButtonFallbackProps) {
  const { t } = useTranslation();

  return (
    <Tooltip
      label={t({ pt: 'Carregando...', en: 'Loading...', es: 'Cargando...' })}
    >
      {!defaultFormat ? (
        <MainExportButton {...rest} />
      ) : (
        <ActionIconGroup>
          <MainExportButton {...rest} />
          <MenuExportButton {...rest} />
        </ActionIconGroup>
      )}
    </Tooltip>
  );
}
