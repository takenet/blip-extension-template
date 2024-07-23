import {
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuTarget,
  Tooltip,
} from '@mantine/core';
import { SettingsGeneralOutline } from '@blip-ds/react-icons';
import { useState } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { ActionIcon } from 'components/blip-ds/action-icon';
import { ColorSchemeMenuItems } from './color-scheme-menu-items';

export function SettingsButton() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();

  return (
    <Menu position="top-start" opened={opened} onChange={setOpened}>
      <MenuTarget>
        <Tooltip label="Configurações" disabled={opened}>
          <ActionIcon variant="tertiary" size="md">
            <SettingsGeneralOutline className="size-5" />
          </ActionIcon>
        </Tooltip>
      </MenuTarget>
      <MenuDropdown w={150}>
        <ColorSchemeMenuItems />
        <MenuDivider mt="0.5rem" mb="0.4rem" />
        <div className="text-center text-xs text-dimmed">
          {`${t({ pt: 'Versão', en: 'Version', es: 'Versión' })} 1.2.0`}
        </div>
      </MenuDropdown>
    </Menu>
  );
}
