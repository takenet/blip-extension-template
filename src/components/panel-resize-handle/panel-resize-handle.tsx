import clsx from 'clsx';
import {
  PanelResizeHandle as OriginalPanelResizeHandle,
  type PanelResizeHandleProps,
} from 'react-resizable-panels';

export function PanelResizeHandle({
  className,
  ...rest
}: PanelResizeHandleProps) {
  return (
    <OriginalPanelResizeHandle
      className={clsx(
        className,
        "mantine-focus-auto z-10 basis-px bg-gray-3 transition-colors hover:!bg-blue-5 data-[resize-handle-active='keyboard']:!bg-blue-5 data-[resize-handle-active='pointer']:!bg-blue-5 dark:bg-dark-4",
      )}
      {...rest}
    />
  );
}
