import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu, action as toggleMenu } from 'redux-burger-menu';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faHome, faGift, faArchive, faPlayCircle, faEnvelope } from '@fortawesome/fontawesome-free-solid';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-regular';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/fontawesome-free-brands';

import './Drawer.scss';
import Languages from '../Languages';
import UserNav from './UserNav';
import DrawerSeparator from './Separator/index';

function fixBody(menuState) {
    const body = document.querySelector('body');

    if (menuState.isOpen) body.classList.add('fixed');
    else body.classList.remove('fixed');
}

const Drawer = ({ dispatch, isOpen, t }) => (
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
            <header><UserNav /></header>
            <DrawerSeparator>{t('component:Drawer.separators.navigation')}</DrawerSeparator>
            <ul className="fa-ul">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faHome} listItem />&nbsp;{t('route:home.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faPlayCircle} listItem />&nbsp;{t('route:games.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faBell} listItem />&nbsp;{t('route:notifications.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faCalendarAlt} listItem />&nbsp;{t('route:calendar.text')}
                    </a>
                </li>
            </ul>
            <DrawerSeparator>{t('component:Drawer.separators.gifts')}</DrawerSeparator>
            <ul className="fa-ul">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faArchive} listItem />&nbsp;{t('route:inventory.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faGift} listItem />&nbsp;{t('route:shop.text')}
                    </a>
                </li>
            </ul>
            <DrawerSeparator>{t('component:Drawer.separators.settings')}</DrawerSeparator>
            <Languages />
            <footer>
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </footer>
        </nav>
    </Menu>
);

Drawer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'component', 'form', 'route'])(connect(
    () => ({}),
    dispatch => ({ dispatch }),
)(reduxBurgerMenu(Drawer)));
