import { Divider, ScrollArea } from '@mantine/core';
// import { SettingsButton } from 'pages/home/components/settings-button';
import { BugReportButton } from 'components/bug-report-button';
import { TitleCard } from 'components/title-card';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { SettingsButton } from 'pages/home/components/settings-button';
import { useTranslation } from 'contexts/translation-context';
import { PaginationHandler } from './components/pagination-handler';
import { ExportButton } from './components/export-button';
import { ErrorsButton } from './components/errors-button';
import { RefreshButton } from './components/refresh-button';
// import { ExpandButton } from './components/expand-button';

export function TableBar<TData>() {
  const { dataType } = useTableContext<TData>();
  const { t } = useTranslation();

  return (
    <ScrollArea w="100%">
      <div className="flex items-center justify-between gap-lg border-0 border-b border-solid border-gray-3 px-md py-2 dark:border-dark-4">
        <div className="flex items-center gap-2">
          <TitleCard
            title={t(dataType.label.plural)}
            description={t(dataType.description)}
          />
          <Divider
            className="m-1 border-gray-3 dark:border-dark-4"
            orientation="vertical"
          />
          <RefreshButton />
          <SettingsButton />
          <BugReportButton />
          <ExportButton />
          <ErrorsButton />
          {/* <Divider
          className="m-1 border-gray-3 dark:border-dark-4"
          orientation="vertical"
        /> */}
          {/* <ExpandButton /> */}
        </div>

        <PaginationHandler />
      </div>
    </ScrollArea>
  );
}
