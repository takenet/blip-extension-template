import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

type Error =
  | Partial<{
      status: number;
      statusText: string;
    }>
  | undefined
  | null;

const ErrorPage = () => {
  const error = useRouteError() as Error;
  const { t } = useTranslation();

  return (
    <div className="my-24 flex w-full flex-col items-center justify-center">
      <p className="m-0 p-0 text-center text-9xl">
        {error?.status !== undefined
          ? error.status
          : t('errorPage.defaultStatus')}
      </p>
      <p className="mt-1 text-xl font-normal">
        {error?.statusText !== undefined
          ? error.statusText
          : t('errorPage.defaultStatusText')}
      </p>
    </div>
  );
};

export default ErrorPage;
