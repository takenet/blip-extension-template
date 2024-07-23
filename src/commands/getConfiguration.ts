import {
  type BuildParams,
  buildURI,
  sendCommand,
  type Sender,
} from 'blip-iframe';

export interface GetConfigurationParams extends BuildParams {
  caller?: string;
}

/**
 * @param params - The parameters for the function
 * @returns
 */
export async function getConfiguration(
  {
    caller = 'admin@msging.net',
    ...buildSearchParams
  }: GetConfigurationParams = {},
  sender?: Sender,
) {
  const uri = buildURI({
    paths: ['configuration'],
    params: { caller },
    ...buildSearchParams,
  });

  return await sendCommand<GetConfigurationResponse>(
    {
      command: {
        method: 'get',
        to: 'postmaster@msging.net',
        uri,
      },
    },
    sender,
  );
}

export interface GetConfigurationResponse {
  total: number;
  itemType: string;
  items: unknown[];
}
