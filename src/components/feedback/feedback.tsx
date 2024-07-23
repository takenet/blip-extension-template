import type { AffixProps } from '@mantine/core';
import {
  Affix,
  Button,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useState } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { FeedbackForm } from './components/feedback-form';
import type { FeedbackFormValues } from './hooks/use-feedback-form';

export interface FeedbackProps {
  hide?: boolean;
  onHide?: () => void;
  onSubmit: (values: FeedbackFormValues) => void;
  affixProps?: Partial<AffixProps>;
}

export function Feedback({
  affixProps,
  onSubmit,
  hide = false,
}: FeedbackProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);

  if (hide) {
    return null;
  }

  return (
    <Popover
      onChange={setOpened}
      opened={opened}
      position="left"
      shadow="md"
      trapFocus
      width={300}
      withArrow
    >
      <Affix position={{ top: '50%', right: 0 }} {...affixProps}>
        <PopoverTarget>
          <Button
            style={{
              backgroundColor: '#1c63deAA',
              padding: '6px 8px 4px 8px',
              fontWeight: 700,
              height: 'auto',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              transformOrigin: 'bottom right',
              transform: 'translateY(-100px) rotate(-90deg)',
            }}
            onClick={() => setOpened((o) => !o)}
            size="xs"
            type="button"
          >
            {t({
              en: 'Give feedback',
              pt: 'Dar feedback',
              es: 'Dar feedback',
            })}
          </Button>
        </PopoverTarget>
      </Affix>

      <PopoverDropdown p={0} px={0} w={400}>
        <FeedbackForm onClose={() => setOpened(false)} onSubmit={onSubmit} />
      </PopoverDropdown>
    </Popover>
  );
}
