import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import dataService from 'services/dataService';
import { translatedMessages } from './i18n';

const withLocale = (Child) => function withLocalHook(props) {
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    dataService?.readLocalData({ fileName: 'appSetting' })
      ?.then((res) => {
        const setting = JSON.parse(res);
        setLocale(setting?.locale || 'en');
      });
  }, []);
  return (
    <IntlProvider locale={locale} messages={translatedMessages[locale]}>
      <Child {...props} setLocale={setLocale} locale={locale} />
    </IntlProvider>
  );
};

export default withLocale;
