import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './Languages.css';

// TODO: maybe create a converting table between i18n locales and flag-icons en -> gb is the only case so far
const localeToFlag = i18n => (i18n.language === 'en' ? 'gb' : i18n.language);
const getLanguageItemClass = (locale, i18n) => (i18n.language === locale ? 'hidden' : 'visible');

const Languages = ({ i18n, t }) => (
    <div className="languages dropdown">
        <button
            type="button"
            id="languagesDropdown"
            className="dropdown-toggle btn btn-outline-light"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            <span className={`flag-icon flag-icon-${localeToFlag(i18n)}`} />
            {t(`language.${i18n.language}`)}
        </button>
        <div
            htmlFor="languagesDropdown"
            className="dropdown-menu"
            aria-labelledby={t('component:MainHeader.Languages.languagesDropdown.labelledBy')}
        >
            <a className="dropdown-item" href="#">
                <span className={`flag-icon flag-icon-${localeToFlag(i18n)}`} />
                {t(`language.${i18n.language}`)}
            </a>
            <div className="dropdown-divider" />
            <a
                className={`dropdown-item ${getLanguageItemClass('en', i18n)}`}
                href="#"
                onClick={() => i18n.changeLanguage('en')}
            >
                <span className="flag-icon flag-icon-gb" />
                {t('language.en')}
            </a>
            <a
                className={`dropdown-item ${getLanguageItemClass('fr', i18n)}`}
                href="#"
                onClick={() => i18n.changeLanguage('fr')}
            >
                <span className="flag-icon flag-icon-fr" />
                {t('language.fr')}
            </a>
            <a
                className={`dropdown-item ${getLanguageItemClass('es', i18n)}`}
                href="#"
                onClick={() => i18n.changeLanguage('es')}
            >
                <span className="flag-icon flag-icon-es" />
                {t('language.es')}
            </a>
            <a
                className={`dropdown-item ${getLanguageItemClass('de', i18n)}`}
                href="#"
                onClick={() => i18n.changeLanguage('de')}
            >
                <span className="flag-icon flag-icon-de" />
                {t('language.de')}
            </a>
        </div>
    </div>
);

Languages.propTypes = {
    i18n: PropTypes.shape({
        changeLanguage: PropTypes.func,
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'component', 'form', 'route'])(Languages);
