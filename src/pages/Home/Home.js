import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-24 text-neutral-dark-city">
      <a
        href="https://takenet.github.io/blip-ds"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="size-32 transition-[filter] duration-300 will-change-[filter] hover:[filter:drop-shadow(0_0_2em_#00c6d7aa)]"
          src="/blip.svg"
          alt="blip logo"
        />
      </a>
      <div className="text-center">
        <p>{t('home.title')}</p>
        <p>
          <Trans i18nKey="home.subtitle" components={{ codeBlock: <code /> }} />
        </p>
      </div>
      <bds-button onClick={() => setCount((prevCount) => prevCount + 1)}>
        <Trans i18nKey="home.button-count" count={count} />
      </bds-button>
    </div>
  );
};

export default Home;
