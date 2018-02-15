import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu, action as toggleMenu } from 'redux-burger-menu';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faEdit, faFutbol, faHome, faGift, faTasks,
    faUsers, faPlayCircle, faEnvelope, faSignInAlt,
} from '@fortawesome/fontawesome-free-solid';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-regular';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/fontawesome-free-brands';

import { routes } from '../../helpers/routes';
import { setAppLocale } from '../../actions/app';

import './Drawer.scss';
import Languages from '../Languages';
import UserNav from './UserNav';
import DrawerSeparator from './Separator/index';

function fixBody(menuState) {
    const body = document.querySelector('body');

    if (menuState.isOpen) body.classList.add('fixed');
    else body.classList.remove('fixed');
}

function close(dispatch) {
    dispatch(toggleMenu(false));
}

const Drawer = ({ credentials, dispatch, isOpen, t }) => (
    <Menu
        isOpen={isOpen}
        pageWrapId="page"
        outerContainerId="app"
        onStateChange={(menuState) => {
            fixBody(menuState);
            if (isOpen !== menuState.isOpen) { dispatch(toggleMenu(menuState.isOpen)); }
        }}
    >
        <nav id="drawer-nav">
            <header>
                {credentials.profile && (
                    <UserNav
                        {...credentials.profile}
                        email={credentials.profile.email}
                        handleClick={() => close(dispatch)}
                        picture={credentials.profile.picture}
                    />
                )}
                {!credentials.profile && (
                    <h3><FontAwesomeIcon icon={faFutbol} className="mr-3 " />{t('project.name')}</h3>
                )}
            </header>
            {!credentials.token && (
                <section>
                    <DrawerSeparator>{t('component:Drawer.separators.authentication')}</DrawerSeparator>
                    <ul className="fa-ul">
                        <li className="nav-item">
                            <Link className="nav-link" to={routes.auth.signIn} onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faSignInAlt} listItem />&nbsp;{t('route:signIn.text')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={routes.auth.register} onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faEdit} listItem />&nbsp;{t('route:register.text')}
                            </Link>
                        </li>
                    </ul>
                </section>
            )}
            <section>
                <DrawerSeparator>{t('component:Drawer.separators.navigation')}</DrawerSeparator>
                <ul className="fa-ul">
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.home} onClick={() => close(dispatch)}>
                            <FontAwesomeIcon icon={faHome} listItem />&nbsp;{t('route:home.text')}
                        </Link>
                    </li>
                    {credentials.token && (
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faPlayCircle} listItem />&nbsp;{t('route:newGame.text')}
                            </Link>
                        </li>
                    )}
                    {credentials.token && (
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faTasks} listItem />&nbsp;{t('route:games.text')}
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to={routes.calendar.exact} onClick={() => close(dispatch)}>
                            <FontAwesomeIcon icon={faCalendarAlt} listItem />&nbsp;{t('route:calendar.text')}
                        </Link>
                    </li>
                </ul>
            </section>
            {credentials.token && (
                <section>
                    <DrawerSeparator>{t('component:Drawer.separators.gifts')}</DrawerSeparator>
                    <ul className="fa-ul">
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faUsers} listItem />&nbsp;{t('route:legends.text')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => close(dispatch)}>
                                <FontAwesomeIcon icon={faGift} listItem />&nbsp;{t('route:shop.text')}
                            </Link>
                        </li>
                    </ul>
                </section>
            )}
            <section>
                <DrawerSeparator>{t('component:Drawer.separators.settings')}</DrawerSeparator>
                <Languages onChangeLanguage={lang => dispatch(setAppLocale(lang))} />
            </section>
            <footer>
                <a className="nav-link" href="#" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a className="nav-link" href="#" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="nav-link" href="#" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <Link className="nav-link" to="#" onClick={() => close(dispatch)}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </Link>
            </footer>
        </nav>
    </Menu>
);

Drawer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    credentials: PropTypes.shape({
        _id: PropTypes.string,
        token: PropTypes.string,
        profile: PropTypes.shape({
            email: PropTypes.string,
            userName: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            phoneNumber: PropTypes.string,
            picture: PropTypes.string,
        }),
    }),
    t: PropTypes.func.isRequired,
};

Drawer.defaultProps = {
    credentials: null,
};

export default translate(['common', 'component', 'form', 'route'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(reduxBurgerMenu(Drawer)));
