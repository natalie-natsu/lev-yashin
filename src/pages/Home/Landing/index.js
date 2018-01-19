import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Trans, translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrophy, faPlusCircle } from '@fortawesome/fontawesome-free-solid';

import { routes } from '../../../helpers/routes';
import './Landing.scss';
import banner from './assets/banner.png';

const btnClass = 'btn btn-outline-neutral btn-lg d-none mt-2';

const Landing = ({ credentials, t }) => (
    <section id="home-landing" className="jumbotron-fluid" style={{ backgroundImage: `url(${banner})` }}>
        <span className="square d-none d-sm-inline" style={{ backgroundImage: `url(${banner})` }} />
        <div className="container">
            <h1 className="animated fadeIn">
                <span className="f-secondary">
                    <Trans i18nKey="page:Home.Landing.title" parent="span">
                        Win the <span className="hidden-sm-down d-sm-inline">RUSSIA</span> World Cup
                    </Trans>
                </span>
            </h1>
            <Link
                to={routes.auth.register}
                className={classNames(btnClass, { 'd-sm-inline-block': !credentials.token })}
            >
                <FontAwesomeIcon icon={faTrophy} /> {t('page:Home.Landing.register')}
            </Link>
            <Link to={routes.game.create} className={classNames(btnClass, { 'd-sm-inline-block': credentials.token })}>
                <FontAwesomeIcon icon={faPlusCircle} /> {t('page:Home.Landing.newGame')}
            </Link>
        </div>
    </section>
);

Landing.propTypes = {
    credentials: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['page'])(Landing);
