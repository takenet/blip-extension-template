import type { MantineTheme, RatingProps } from '@mantine/core';
import { Rating, Text, useMantineTheme } from '@mantine/core';
import { IconMoodCrazyHappy } from '../icons/icon-mood-crazy-happy';
import { IconMoodCry } from '../icons/icon-mood-cry';
import { IconMoodEmpty } from '../icons/icon-mood-empty';
import { IconMoodHappy } from '../icons/icon-mood-happy';
import { IconMoodSad } from '../icons/icon-mood-sad';

export interface FeedbackRatingProps extends RatingProps {
  error?: string | null;
}

const indexToIcon = {
  1: { icon: IconMoodCry, color: 'red' },
  2: { icon: IconMoodSad, color: 'orange' },
  3: { icon: IconMoodEmpty, color: 'yellow' },
  4: { icon: IconMoodHappy, color: 'lime' },
  5: { icon: IconMoodCrazyHappy, color: 'green' },
};

const getEmptyIcon = (value: number) => {
  if (!(value in indexToIcon)) return null;

  const Icon = indexToIcon[value as keyof typeof indexToIcon].icon;

  return <Icon color="gray" size={36} />;
};

function getFullSymbol(theme: MantineTheme) {
  return function fullSymbol(value: number) {
    if (!(value in indexToIcon)) return null;

    const Icon = indexToIcon[value as keyof typeof indexToIcon].icon;
    const color = indexToIcon[value as keyof typeof indexToIcon].color;

    return <Icon color={theme.colors[color][7]} size={36} />;
  };
}

export function FeedbackRating({ error, ...rest }: FeedbackRatingProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Rating
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullSymbol(theme)}
        highlightSelectedOnly
        {...rest}
      />
      {error ? (
        <Text c="red" size="xs">
          {error}
        </Text>
      ) : null}
    </>
  );
}
