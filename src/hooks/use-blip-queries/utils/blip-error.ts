import { type UseQueryResult } from '@tanstack/react-query';
import { type Page } from '../use-blip-queries';

export class BlipError extends Error {
  page: Page;

  constructor(message: string, page: Page) {
    super(message);
    this.name = 'BlipError';
    this.page = page;
  }
}

export type UseBlipQueryResult<TData> = UseQueryResult<
  {
    items: (TData & { page: Page })[];
    page: Page;
  },
  BlipError
>;
