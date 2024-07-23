import {
  getApplication,
  getApplications,
  type GetApplicationsItem,
  getAttendants,
  type GetAttendantsResponse,
  type Response,
} from 'blip-iframe';
import { BlipTable } from 'components/blip-table';
import { applications } from './utils/applications';

export type ApplicationsItem = GetApplicationsItem & {
  attendants?: Response<GetAttendantsResponse>;
};

export function ApplicationsTable() {
  return (
    <BlipTable<ApplicationsItem>
      dataType={applications}
      currentNodeOnly
      pagination={false}
      hasNodeColumn={false}
      queryFn={async () => {
        const appResponse = await getApplication();
        if (!appResponse.success) return appResponse;
        const application = appResponse.data;

        const appsResponse = await getApplications({
          tenantId: application.tenantId,
          method: 'all',
        });

        if (!appsResponse.success) return appsResponse;

        const attendantsResponses = await Promise.all(
          appsResponse.data.items.map((app) =>
            getAttendants({
              prefix: app.shortName
                ? `lime://${app.shortName}@msging.net/`
                : undefined,
            }),
          ),
        );

        return {
          ...appsResponse,
          data: {
            ...appsResponse.data,
            items: appsResponse.data.items.map((app, index) => {
              return {
                ...app,
                attendants: attendantsResponses[index],
              };
            }),
          },
        };
      }}
    />
  );
}
