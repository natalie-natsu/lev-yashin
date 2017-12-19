import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu, action as toggleMenu } from 'redux-burger-menu';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faGift, faGamepad } from '@fortawesome/fontawesome-free-solid';
import { faFacebook } from '@fortawesome/fontawesome-free-brands';

import './Drawer.scss';
import Languages from '../Languages';

const Drawer = ({ dispatch, isOpen, t }) => (
    <Menu
        isOpen={isOpen}
        pageWrapId="page"
        outerContainerId="app"
        onStateChange={menuState => isOpen !== menuState.isOpen && dispatch(toggleMenu(menuState.isOpen))}
    >
        <nav id="drawer-nav">
            <header>
                <div className="translate">
                    <img
                        className="mr-3 rounded-circle"
                        // eslint-disable-next-line max-len
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1606c34efe6%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1606c34efe6%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        alt="Generic placeholder"
                    />
                    <span>Nicolas Rouvière</span>
                </div>
            </header>
            <Languages />
            <ul className="fa-ul">
                <li className="nav-item active">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faHome} listItem />&nbsp;{t('route:home.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faGift} listItem />&nbsp;{t('route:inventory.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faGamepad} listItem />&nbsp;{t('route:games.text')}
                    </a>
                </li>
            </ul>
            <footer>
                <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faFacebook} />
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
