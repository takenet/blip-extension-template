export interface IconMoodEmptyProps {
  color?: string;
  size?: number;
}

export function IconMoodEmpty({ color, size }: IconMoodEmptyProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 44}
      height={size ?? 44}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color ?? '#2c3e50'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9 15l6 0" />
    </svg>
  );
}
