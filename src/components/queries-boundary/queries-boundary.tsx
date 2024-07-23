import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { type ErrorStateProps, ErrorState } from 'components/error-state';
import { LoadingState, type LoadingStateProps } from 'components/loading-state';

interface Props<TData = unknown, TError = unknown> {
  queries: UseQueryResult<TData, TError>[];
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  loadingProps?: LoadingStateProps;
  errorProps?: ErrorStateProps;
  children: (queries: UseQueryResult<TData, TError>[]) => JSX.Element;
  loadingTitle?: string;
  errorTitle?: string;
}

export function QueriesBoundary<TData = unknown, TError = unknown>({
  queries,
  children,
  loadingComponent,
  errorComponent,
  loadingProps,
  errorProps,
  errorTitle,
  loadingTitle,
}: Props<TData, TError>) {
  if (queries.every((query) => query.isLoading)) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <LoadingState title={loadingTitle} {...loadingProps} />
    );
  }

  if (queries.every((query) => query.isError)) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <ErrorState title={errorTitle} query={queries} {...errorProps} />
    );
  }

  return children(queries);
}
