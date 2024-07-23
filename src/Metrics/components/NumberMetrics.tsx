import {
  Divider,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  type MantineColor,
  Text,
  Title,
} from '@mantine/core';
import { type BaseIcon } from '@blip-ds/react-icons';
import { parseNumber } from 'Metrics/utils/parseNumber';
import { MetricWrapper } from './MetricWrapper';

interface Props {
  color: MantineColor;
  icon: BaseIcon;
  label: string;
  description?: string;
  data: {
    value: number;
    label: string;
    color?: MantineColor;
    description?: string;
  }[];
}

export function NumberMetrics({
  label,
  data,
  color,
  description,
  icon: Icon,
}: Props) {
  return (
    <MetricWrapper className="col-span-3 aspect-[3/1] items-center">
      <div className="flex w-full flex-col border-0 border-b border-solid border-dark-4 px-xs pb-1 pt-2">
        <div className="flex items-center gap-1">
          <div
            className="flex aspect-square size-5 items-center justify-center rounded-sm"
            style={{
              backgroundColor: `var(--mantine-color-${color}-light-hover)`,
              color: `var(--mantine-color-${color}-light-color)`,
            }}
          >
            <Icon size="1.125rem" />
          </div>
          <Title fw="bold" size="h5" order={2}>
            {label}
          </Title>
        </div>
        {description ? (
          <Text c="dimmed" size="xs">
            {description}
          </Text>
        ) : null}
      </div>
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          width: '100%',
        }}
      >
        {data.map((item, index) => {
          const itemLabel = (
            <div className="flex items-center gap-1">
              <div
                className="size-3 rounded-sm"
                style={{
                  backgroundColor: `var(--mantine-color-${item.color}-filled-hover)`,
                }}
              />
              <Text className="relative" fw="bold" size="sm" c="dimmed">
                {item.label}
                {item.description ? (
                  <svg
                    className="absolute -right-4 top-[-0.6rem] text-dimmed"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 9h.01" />
                    <path d="M11 12h1v4h1" />
                  </svg>
                ) : null}
              </Text>
            </div>
          );

          return (
            <div className="relative flex" key={`${item.label}-${item.color}`}>
              {index !== 0 ? (
                <Divider
                  className="absolute left-0 top-1/2 h-12 -translate-y-1/2"
                  orientation="vertical"
                />
              ) : null}

              <div className="flex grow flex-col items-center justify-center gap-1 px-1">
                <Text className="truncate" size="28px" fw="bold">
                  {parseNumber(item.value)}
                </Text>
                {item.description ? (
                  <HoverCard withArrow width={300}>
                    <HoverCardTarget>{itemLabel}</HoverCardTarget>
                    <HoverCardDropdown p="xs">
                      <Text size="xs">{item.description}</Text>
                    </HoverCardDropdown>
                  </HoverCard>
                ) : (
                  itemLabel
                )}
              </div>
            </div>
          );
        })}
      </div>
    </MetricWrapper>
  );
}
