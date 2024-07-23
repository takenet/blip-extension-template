import {
  Avatar,
  type AvatarProps,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
} from '@mantine/core';
import { type BaseIcon } from '@blip-ds/react-icons';
import { type ReactNode } from 'react';

export interface AvatarCardProps extends AvatarProps {
  alt?: string;
  src: string | null | undefined;
  label: ReactNode;
  fallback: BaseIcon;
}

export function AvatarCard({
  alt,
  src,
  label,
  fallback: Fallback,
  ...rest
}: AvatarCardProps) {
  return (
    <div className="flex items-center gap-xs">
      <HoverCard disabled={!src}>
        <HoverCardTarget>
          <Avatar alt={alt} src={src} size="sm" {...rest}>
            <Fallback size="80%" />
          </Avatar>
        </HoverCardTarget>
        <HoverCardDropdown p={0} className="overflow-hidden">
          <Avatar alt={alt} src={src} size={150} radius={0}>
            <Fallback size="80%" />
          </Avatar>
        </HoverCardDropdown>
      </HoverCard>
      <div className="truncate">{label}</div>
    </div>
  );
}
