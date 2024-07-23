import {
  Anchor,
  Menu,
  MenuDropdown,
  MenuTarget,
  Text,
  UnstyledButton,
} from '@mantine/core';
import clsx from 'clsx';
import { SettingsGeneralOutline } from '@blip-ds/react-icons';
import { useTranslation } from 'contexts/translation-context';
import { useDisclosure } from 'hooks/use-disclosure';
import { dataTypes } from '../utils/data-types';
import { DataRequest } from './data-request';
import { ColorSchemeMenuItems } from './color-scheme-menu-items';

interface Props {
  active: string;
  onChangeActive: (name: string) => void;
}

export function Navbar({ active, onChangeActive }: Props) {
  const dataRequestDisclosure = useDisclosure();
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col justify-between border-r border-gray-3 dark:border-dark-4">
      <div className="flex grow flex-col p-sm">
        {dataTypes.map((dataType) => {
          const isActive = dataType.name === active;

          return (
            <UnstyledButton
              className={clsx(
                'flex items-center rounded-md px-xs py-1.5 text-xs font-semibold no-underline',
                isActive
                  ? 'bg-blue-light text-blue-light-color'
                  : 'text-gray-7 hover:bg-gray-0 dark:text-dark-1 dark:hover:bg-dark-6',
              )}
              key={dataType.name}
              onClick={(event) => {
                event.preventDefault();
                onChangeActive(dataType.name);
              }}
            >
              <dataType.icon
                className={clsx(
                  'mr-sm size-6',
                  isActive ? '' : 'text-gray-6 dark:text-dark-2',
                )}
              />
              <span className="capitalize">{t(dataType.label.plural)}</span>
            </UnstyledButton>
          );
        })}
      </div>
      <div className="flex flex-col gap-0.5 px-xs pb-1.5">
        <Text size="xs" ta="center" c="dimmed">
          {t({
            pt: 'Não encontrou o que precisa?',
            en: "Didn't find what you need?",
            es: '¿No encontró lo que necesita?',
          })}{' '}
          <Anchor
            component="button"
            type="button"
            onClick={dataRequestDisclosure.open}
          >
            {t({
              pt: 'Pedir um novo dado',
              en: 'Request new data',
              es: 'Solicitar un nuevo dato',
            })}
          </Anchor>
        </Text>
        <div className="flex items-center justify-center text-xs text-dimmed">
          <Menu position="top" withArrow>
            <MenuTarget>
              <button
                type="button"
                className="mantine-focus-auto flex items-center gap-px rounded-md border-none bg-transparent px-0 text-dimmed hover:text-blue-6 hover:underline"
              >
                <SettingsGeneralOutline size="0.875rem" />
                {t({
                  pt: 'Configurações',
                  en: 'Settings',
                  es: 'Configuraciones',
                })}
              </button>
            </MenuTarget>
            <MenuDropdown w={150}>
              <ColorSchemeMenuItems />
            </MenuDropdown>
          </Menu>
          <span className="mx-1">&bull;</span>
          <span>v1.3.0</span>
        </div>
      </div>
      <DataRequest disclosure={dataRequestDisclosure} />
    </div>
  );
}
