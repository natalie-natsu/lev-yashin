import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid/index';

const RavenError = ({ t }) => (
    <button
        className="alert alert-danger snap animated bounce"
        onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
        onKeyPress={() => Raven.lastEventId() && Raven.showReportDialog()}
    >
        <p><FontAwesomeIcon icon={faExclamationTriangle} /> {t('raven.error.title')}</p>
        <p>{t('raven.error.description')}</p>
    </button>
);

RavenError.propTypes = {
    t: PropTypes.func.isRequired,
};

export default translate()(RavenError);
