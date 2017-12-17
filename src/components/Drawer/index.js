import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu, action as toggleMenu } from 'redux-burger-menu';
import './Drawer.scss';

import Languages from '../Languages';

const Drawer = ({ dispatch, isOpen, t }) => (
    <Menu
        isOpen={isOpen}
        pageWrapId="page"
        outerContainerId="app"
        onStateChange={menuState => isOpen !== menuState.isOpen && dispatch(toggleMenu(menuState.isOpen))}
    >
        <div>
            <span className="hidden-sm-down mr-3"><Languages /></span>
            <ul className="fa-ul">
                <li className="nav-item active">
                    <a className="nav-link" href="#">
                        <i className="fa fa-home fa-li" />&nbsp;{t('route:home.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="fa fa-gift fa-li" />&nbsp;{t('route:inventory.text')}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="fa fa-gamepad fa-li" />&nbsp;{t('route:games.text')}
                    </a>
                </li>
            </ul>
        </div>
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
