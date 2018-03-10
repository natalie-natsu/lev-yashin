import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(reactI18nextModule) // if not using I18nextProvider
    .init({
        ns: ['common', 'component', 'form', 'route', 'page'],
        defaultNS: 'common',
        fallbackLng: 'en',
        whitelist: ['de', 'en', 'es', 'fr', 'it', 'nl', 'po', 'ru'],
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default',
            defaultTransParent: 'span',
        },

        backend: {
            loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
        },
    });

export default i18n;
