import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center border-b border-neutral-medium-wave pb-4 pt-6">
      <h1 className="text-2xl font-semibold text-neutral-dark-city">
        {t('header.title')}
      </h1>
      <div className="ml-2 cursor-help pt-2 text-neutral-medium-cloud">
        <bds-tooltip
          position="right-center"
          tooltip-text={t('header.information')}
        >
          <bds-icon name="info" theme="solid" />
        </bds-tooltip>
      </div>
    </header>
  );
};

export default Header;
