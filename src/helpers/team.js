import countries from 'i18n-iso-countries';
import { getI18n } from 'react-i18next';
import i18next from 'i18next';

import { localeTo } from './locales';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

// eslint-disable-next-line import/prefer-default-export
export const getTeamName = (team, language = getI18n().language) => {
    const ISOCode = team.flagIcon;
    const lang = localeTo(language, 'i18n');

    if (ISOCode === 'gb-eng') { return i18next.t('team.gb-eng'); }
    const name = countries.getName(ISOCode, lang);

    return name ? name.replace(', République', '') : team.name;
};
