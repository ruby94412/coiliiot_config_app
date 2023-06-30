import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { translatedMessages } from './i18n';

const withLocale = (Child) => function withLocalHook(props) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  return (
    <IntlProvider locale={locale} messages={translatedMessages[locale]}>
      <Child {...props} setLocale={setLocale} locale={locale} />
    </IntlProvider>
  );
};

export default withLocale;
