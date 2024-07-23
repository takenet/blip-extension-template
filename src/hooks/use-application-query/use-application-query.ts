import { useQuery } from '@tanstack/react-query';
import { getApplication } from 'blip-iframe';

export function useApplicationQuery() {
  const applicationQuery = useQuery({
    queryKey: ['get-application'],
    queryFn: async () => {
      const response = await getApplication();
      if (!response.success) throw response.error;
      return response.data;
    },
  });

  return applicationQuery;
}
