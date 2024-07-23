import {
  Button,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  ScrollAreaAutosize,
  useComputedColorScheme,
} from '@mantine/core';
import ReactJson from '@microlink/react-json-view';
import clsx from 'clsx';
import { useTranslation } from 'contexts/translation-context';

interface Props {
  className?: string;
  value: unknown;
  name: string;
}

export function JsonViewer({ className, value, name }: Props) {
  const { t } = useTranslation();
  const colorScheme = useComputedColorScheme('dark');

  if (!value) return null;

  if (typeof value !== 'object') {
    return (
      <div className={clsx(className, 'flex h-[40px] items-center gap-xs')}>
        <span className="italic text-dimmed">
          {t({
            pt: 'Visualização indisponível',
            en: 'Preview unavailable',
            es: 'Vista previa no disponible',
          })}
        </span>
      </div>
    );
  }

  return (
    <HoverCard width={500} shadow="md" withArrow position="left">
      <HoverCardTarget>
        <div
          className={clsx(
            className,
            'flex h-[40px] items-center justify-center',
          )}
        >
          <Button className="w-40" component="div" size="xs" variant="light">
            {t({
              pt: 'Ver JSON',
              en: 'View JSON',
              es: 'Ver JSON',
            })}
          </Button>
        </div>
      </HoverCardTarget>
      <HoverCardDropdown p={0}>
        <ScrollAreaAutosize h={400}>
          <div className="p-xs">
            <ReactJson
              src={value}
              style={{
                backgroundColor: 'transparent',
              }}
              name={name}
              theme={colorScheme === 'light' ? 'bright:inverted' : 'ocean'}
              collapseStringsAfterLength={70}
            />
          </div>
        </ScrollAreaAutosize>
      </HoverCardDropdown>
    </HoverCard>
  );
}
