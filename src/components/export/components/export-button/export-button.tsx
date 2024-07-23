import {
  ActionIconGroup,
  type ActionIconProps,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Tooltip,
} from '@mantine/core';
import { FileCode, FileCsv } from '@phosphor-icons/react/dist/ssr';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'contexts/translation-context';
import { MainExportButton } from '../main-export-button';
import { MenuExportButton } from '../menu-export-button';
import { exportJson } from '../../utils/export-json';
import { exportCsv } from '../../utils/export-csv';
import { type Exporter } from '../../types';

type DefaultFormat = 'json' | 'csv';

const defaultExporters: Record<DefaultFormat, Exporter> = {
  json: { icon: FileCode, export: exportJson },
  csv: { icon: FileCsv, export: exportCsv },
};

export interface ExportButtonProps<
  TItem extends Record<string, unknown>,
  TFormat extends string,
> extends ActionIconProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {
  name: string;
  items: TItem[] | null | undefined;
  onExport?: (format: string) => void;
  onEmpty?: () => void;
  exporters?: Record<TFormat, Exporter>;
  defaultFormat?: TFormat | DefaultFormat;
  options?: Partial<Record<TFormat | DefaultFormat, Record<string, unknown>>>;
}

export function ExportButton<
  TItem extends Record<string, unknown>,
  TFormat extends string,
>({
  name,
  items,
  defaultFormat,
  exporters: exportersProp,
  onExport: onExportProp,
  options,
  ...rest
}: ExportButtonProps<TItem, TFormat>) {
  const { t } = useTranslation();

  const label = `${t({
    pt: 'Baixar',
    en: 'Download',
    es: 'Descargar',
  })} ${name}`;

  const exporters = {
    ...defaultExporters,
    ...exportersProp,
  } as Record<TFormat | DefaultFormat, Exporter>;

  const onExport = (format: TFormat | DefaultFormat) => {
    if (!items || items.length === 0) {
      showNotification({
        title: t({ pt: 'Erro', en: 'Error', es: 'Error' }),
        message: t({
          pt: 'Não foi possível baixar o arquivo pois não há dados disponíveis.',
          en: 'Could not download the file because there is no data available.',
          es: 'No se pudo descargar el archivo porque no hay datos disponibles.',
        }),
        color: 'red',
      });
      return;
    }

    onExportProp?.(format);

    if (!(format in exporters)) {
      showNotification({
        title: t({ pt: 'Erro', en: 'Error', es: 'Error' }),
        message: t({
          pt: 'Formato de exportação inválido.',
          en: 'Invalid export format.',
          es: 'Formato de exportación inválido.',
        }),
        color: 'red',
      });
      return;
    }

    const _options = options?.[format];
    const exporter = exporters[format];

    exporter.export({ items, name, t, options: _options });
  };

  const menu = (
    <Menu shadow="md" position="bottom-end">
      <MenuTarget>
        <Tooltip
          label={`${label} ${t({ pt: 'como...', en: 'as...', es: 'como...' })}`}
        >
          {!defaultFormat ? (
            <MainExportButton {...rest} />
          ) : (
            <MenuExportButton {...rest} />
          )}
        </Tooltip>
      </MenuTarget>
      <MenuDropdown>
        {Object.entries(exporters).map(([format, exporter]) => (
          <MenuItem
            key={format}
            leftSection={<exporter.icon size="1.125rem" />}
            onClick={() => onExport(format as TFormat | DefaultFormat)}
          >
            {exporter.label ?? format.toUpperCase()}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );

  if (!defaultFormat) {
    return menu;
  }

  return (
    <ActionIconGroup>
      <Tooltip
        label={`${label} ${t({ pt: 'como', en: 'as', es: 'como' })} ${defaultFormat.toUpperCase()}`}
      >
        <MainExportButton onClick={() => onExport(defaultFormat)} {...rest} />
      </Tooltip>
      {menu}
    </ActionIconGroup>
  );
}
