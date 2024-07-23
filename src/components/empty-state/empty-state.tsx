import type { MantineSize } from '@mantine/core';
import { Cube } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps, ReactNode } from 'react';
import { useTranslation } from 'contexts/translation-context';
import classes from './empty-state.module.css';

export interface EmptyStateProps extends ComponentProps<'div'> {
  title?: string;
  description?: string;
  button?: ReactNode;
  icon?: ReactNode;
  size?: MantineSize;
  horizontal?: boolean;
  hasFilters?: boolean;
}

export function EmptyState({
  button,
  title,
  description,
  icon,
  horizontal = false,
  className,
  hasFilters = false,
  size,
  ...rest
}: EmptyStateProps) {
  const { t } = useTranslation();

  const _title =
    title ??
    (!hasFilters
      ? t({
          pt: 'Nada aqui',
          en: 'Nothing here',
          es: 'Nada aquí',
        })
      : t({
          pt: 'Nada encontrado',
          en: 'Nothing found',
          es: 'Nada encontrado',
        }));

  const _description =
    description ??
    (!hasFilters
      ? t({
          pt: 'Adicione um novo item para começar',
          en: 'Add a new item to get started',
          es: 'Agregue un nuevo ítem para empezar',
        })
      : t({
          pt: 'Tente remover ou modificar os filtros',
          en: 'Try removing or modifying the filters',
          es: 'Intente eliminar o modificar los filtros',
        }));

  return (
    <div
      className={className ? `${className} ${classes.root}` : classes.root}
      data-horizontal={horizontal}
      data-size={size}
      {...rest}
    >
      <div className={classes.iconWrapper}>{icon ?? <Cube />}</div>
      <div className={classes.content}>
        <div className={classes.textWrapper}>
          <h3 className={classes.title}>{_title}</h3>
          <div className={classes.description}>{_description}</div>
        </div>
        <div>{button}</div>
      </div>
    </div>
  );
}
