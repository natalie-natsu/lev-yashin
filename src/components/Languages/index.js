import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import className from 'classnames';

import './Languages.css';

// TODO: maybe create a converting table between i18n locales and flag-icons en -> gb is the only case so far
const localeToFlag = i18n => (i18n.language === 'en' ? 'gb' : i18n.language);
const getLanguageItemClass = (locale, i18n) => (i18n.language === locale ? 'hidden' : 'visible');

const Languages = ({ btnClass, i18n, onChangeLanguage, t }) => (
    <div className="languages dropdown">
        <button
            type="button"
            id="languagesDropdown"
            className={className('dropdown-toggle', { [btnClass]: btnClass })}
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
            <a
                className={`dropdown-item ${getLanguageItemClass('en', i18n)}`}
                href="#"
                onClick={(e, lang = 'en') => { onChangeLanguage(lang); i18n.changeLanguage(lang); }}
            >
                <span className="flag-icon flag-icon-gb" />
                {t('language.en')}
            </a>
            <a
                className={`dropdown-item ${getLanguageItemClass('fr', i18n)}`}
                href="#"
                onClick={(e, lang = 'fr') => { onChangeLanguage(lang); i18n.changeLanguage(lang); }}
            >
                <span className="flag-icon flag-icon-fr" />
                {t('language.fr')}
            </a>
            <a
                className={`dropdown-item ${getLanguageItemClass('es', i18n)}`}
                href="#"
                onClick={(e, lang = 'es') => { onChangeLanguage(lang); i18n.changeLanguage(lang); }}
            >
                <span className="flag-icon flag-icon-es" />
                {t('language.es')}
            </a>
        </div>
    </div>
);

Languages.propTypes = {
    btnClass: PropTypes.string,
    i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
    onChangeLanguage: PropTypes.func,
    t: PropTypes.func.isRequired,
};


Languages.defaultProps = {
    onChangeLanguage: lang => lang,
};

Languages.defaultProps = {
    btnClass: 'btn btn-outline-light',
};

export default translate(['common', 'component', 'form', 'route'])(Languages);
