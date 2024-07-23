import { type Dispatch, type SetStateAction } from 'react';
import { type Page } from '../use-blip-queries';

interface Params {
  previousPage: Page;
  setPages: Dispatch<SetStateAction<Page[]>>;
  autoFetch: number;
}

export function autoFetchNextPage({
  previousPage,
  setPages,
  autoFetch,
}: Params) {
  setPages((previousPages) => {
    if (previousPages.length >= autoFetch) {
      return previousPages;
    }

    const newPage: Page = {
      node: previousPage.node,
      take: 100,
      skip: previousPage.skip + 100,
      filter: previousPage.filter,
    };

    const isDuplicate = previousPages.some((page) => {
      return (
        page.node === newPage.node &&
        page.skip === newPage.skip &&
        page.take === newPage.take &&
        page.filter === newPage.filter
      );
    });

    if (isDuplicate) {
      return previousPages;
    }

    return [...previousPages, newPage];
  });
}
