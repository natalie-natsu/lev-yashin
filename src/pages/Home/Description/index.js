import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFutbol, faArrowCircleRight } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import './Description.scss';

const listGroupClassName = 'list-group-item list-group-item-action flex-column align-items-start';

const Description = ({ credentials, t }) => (
    <section id="home-description">
        <div className="container">
            <section className="how-to-play">
                <h3 className="section-title">
                    <FontAwesomeIcon icon={faFutbol} />
                    {t('page:Home.Description.title')}
                </h3>
                <hr />
                <div className="list-group">
                    <Link
                        to={routes.auth.register}
                        className={classNames(listGroupClassName, {
                            active: !credentials.token,
                            disabled: credentials.token,
                        })}
                        disabled={credentials.token}
                    >
                        <div>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{t('page:Home.Description.auth.title')}</h5>
                                <small className="d-none d-sm-inline">{t('page:Home.Description.auth.aside')}</small>
                            </div>
                            <p className="mb-1">{t('page:Home.Description.auth.text')}</p>
                            <small className={classNames({ 'd-none': credentials.token })}>
                                <FontAwesomeIcon icon={faArrowCircleRight} /> {t('page:Home.Description.auth.help')}
                            </small>
                        </div>
                    </Link>
                    <Link
                        to={routes.auth.register}
                        className={classNames(listGroupClassName, {
                            active: credentials.token,
                            disabled: !credentials.token,
                        })}
                        disabled={!credentials.token}
                    >
                        <div>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{t('page:Home.Description.game.title')}</h5>
                                <small className="d-none d-sm-inline">{t('page:Home.Description.game.aside')}</small>
                            </div>
                            <p className="mb-1">{t('page:Home.Description.game.text')}</p>
                            <small className={classNames({ 'd-none': !credentials.token })}>
                                <FontAwesomeIcon icon={faArrowCircleRight} /> {t('page:Home.Description.game.help')}
                            </small>
                        </div>
                    </Link>
                    <Link
                        to={routes.auth.register}
                        className={classNames(listGroupClassName, {
                            disabled: !credentials.token,
                        })}
                        disabled={!credentials.token}
                    >
                        <div>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{t('page:Home.Description.cup.title')}</h5>
                                <small className="d-none d-sm-inline">{t('page:Home.Description.cup.aside')}</small>
                            </div>
                            <p className="mb-1">{t('page:Home.Description.cup.text')}</p>
                            <small>
                                <FontAwesomeIcon icon={faArrowCircleRight} /> {t('page:Home.Description.cup.help')}
                            </small>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    </section>
);

Description.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};


export default translate(['page'])(Description);
