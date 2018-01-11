import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faLongArrowAltLeft } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../helpers/routes';
import SideAction from '../../components/MainHeader/SideAction';

const NoMatch = ({ history, t }) => (
    <div id="no-match">
        <SideAction>
            <div className="btn-side-action mx-2 mx-sm-3">
                <button type="button" className="btn" onClick={() => history.goBack()}>
                    <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </button>
            </div>
        </SideAction>
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-6 mx-auto">
                    <div className="card border-complementary animated bounceIn">
                        <div className="card-body">
                            <h4 className="card-title text-complementary">
                                404 <small>{t('page:NoMatch.card.title')}</small>
                            </h4>
                            <p className="card-text text-complementary">{t('page:NoMatch.card.text')}</p>
                            <Link
                                to={routes.home}
                                className="btn btn-outline-complementary float-right btn-block btn-previous-down"
                            >
                                <FontAwesomeIcon icon={faHome} /> {t('page:NoMatch.card.button')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

NoMatch.propTypes = {
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['page'])(NoMatch);
