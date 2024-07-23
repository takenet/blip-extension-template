import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getApplications, type GetApplicationsResponse } from 'blip-iframe';
import { useApplicationQuery } from 'hooks/use-application-query';

export function useApplicationsQuery() {
  const applicationQuery = useApplicationQuery();

  const applicationsQuery = useQuery({
    queryKey: ['get-applications'],
    queryFn: async () => {
      const response = await getApplications({
        tenantId: applicationQuery.data!.tenantId,
        method: 'all',
      });

      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    enabled: Boolean(applicationQuery.data),
  });

  return {
    ...applicationsQuery,
    isError: applicationsQuery.isError || applicationQuery.isError,
  } as UseQueryResult<GetApplicationsResponse>;
}
