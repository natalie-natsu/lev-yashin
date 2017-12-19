import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/fontawesome-free-solid';
import './NoMatch.css';

// TODO: translations
const NoMatch = ({ t }) => (
    <div id="no-match">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-6 mx-auto">
                    <div className="card border-warning animated bounce">
                        <div className="card-body">
                            <h4 className="card-title text-warning">
                                404 <small>{t('page:NoMatch.card.title')}</small>
                            </h4>
                            <p className="card-text text-warning">{t('page:NoMatch.card.text')}</p>
                            <a href="/" className="btn btn-outline-warning float-right btn-block btn-previous-down">
                                <FontAwesomeIcon icon={faHome} /> {t('page:NoMatch.card.button')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

NoMatch.propTypes = {
    t: PropTypes.func.isRequired,
};

export default translate(['page'])(NoMatch);
