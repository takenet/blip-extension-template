import type { ICellRendererParams } from 'ag-grid-community';
import type { ReactNode } from 'react';
import { EmptyState, type EmptyStateProps } from 'components/empty-state';

interface Props extends ICellRendererParams, EmptyStateProps {
  emptyStateButton?: ReactNode;
}

export function NoRowsOverlay({ title, description, button, icon }: Props) {
  return (
    <EmptyState
      button={button}
      className="pointer-events-auto"
      description={description}
      icon={icon}
      title={title}
    />
  );
}
