import { HoverCard, Text, Title } from '@mantine/core';
import { Info } from '@phosphor-icons/react/dist/ssr';

interface Props {
  title: string;
  description: string;
}

export function TitleCard({ title, description }: Props) {
  return (
    <HoverCard shadow="md" width={280} withArrow>
      <HoverCard.Target>
        <div className="flex items-center gap-1">
          <Title className="capitalize" mt={2} order={2} size="h3">
            {title}
          </Title>
          <Info className="mt-1 text-dimmed" size={14} weight="bold" />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text className="hyphens-auto" size="sm" ta="justify">
          {description}
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
