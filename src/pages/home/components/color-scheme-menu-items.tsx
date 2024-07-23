import {
  type MantineColorScheme,
  MenuItem,
  MenuLabel,
  useMantineColorScheme,
} from '@mantine/core';
import { MoonStars, Sun, Wrench } from '@phosphor-icons/react/dist/ssr';
import { useTranslation } from 'contexts/translation-context';
import { track } from 'lib/utils/track';

export function ColorSchemeMenuItems() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();

  const onChangeColorScheme = (scheme: MantineColorScheme) => {
    track('change-color-scheme', { scheme });
    setColorScheme(scheme);
  };

  return (
    <>
      <MenuLabel>{t({ pt: 'Tema', en: 'Theme', es: 'Tema' })}</MenuLabel>
      <MenuItem
        className={
          colorScheme === 'auto' ? '!bg-blue-light !text-blue-light-color' : ''
        }
        leftSection={<Wrench size={18} />}
        onClick={() => onChangeColorScheme('auto')}
      >
        {t({ pt: 'Sistema', en: 'System', es: 'Sistema' })}
      </MenuItem>
      <MenuItem
        className={
          colorScheme === 'light' ? '!bg-blue-light !text-blue-light-color' : ''
        }
        leftSection={<Sun size={18} />}
        onClick={() => onChangeColorScheme('light')}
      >
        {t({ pt: 'Claro', en: 'Light', es: 'Claro' })}
      </MenuItem>
      <MenuItem
        className={
          colorScheme === 'dark' ? '!bg-blue-light !text-blue-light-color' : ''
        }
        leftSection={<MoonStars size={18} />}
        onClick={() => onChangeColorScheme('dark')}
      >
        {t({ pt: 'Escuro', en: 'Dark', es: 'Oscuro' })}
      </MenuItem>
    </>
  );
}
