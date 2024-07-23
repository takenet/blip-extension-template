import { useMemo } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { useApplicationQuery } from 'hooks/use-application-query';
import { getNodes } from './utils/get-nodes';

interface Params {
  currentOnly?: boolean;
}

export function useNodes({ currentOnly }: Params = { currentOnly: false }) {
  const { t } = useTranslation();
  const applicationQuery = useApplicationQuery();

  const nodes = useMemo(() => {
    if (currentOnly) {
      return ['current'];
    }

    if (!applicationQuery.data) {
      return ['current'];
    }

    return getNodes(applicationQuery.data, t);
  }, [applicationQuery.data, currentOnly, t]);

  return nodes;
}
