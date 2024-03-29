import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { action as toggleMenu } from 'redux-burger-menu';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/fontawesome-free-solid';
import { faFutbol } from '@fortawesome/fontawesome-free-regular';

import { routes } from '../../helpers/routes';
import { setAppLocale } from '../../actions/app';
import './MainHeader.scss';
import Languages from '../Languages';

const MainHeader = ({ burgerMenu, dispatch, t }) => (
    <header id="main-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container position-relative">
                <Link to={routes.home} className="navbar-brand mb-0 h1 hidden-sm-down">
                    worldcup <small><FontAwesomeIcon icon={faFutbol} /></small> game
                </Link>
                <div className="btn-drawer my-2 ml-2 ml-sm-0 mr-2 mr-sm-3">
                    <button
                        className="btn"
                        type="button"
                        aria-expanded="false"
                        aria-label={t('accessibility.aria-label.toggleNav')}
                        onClick={() => dispatch(toggleMenu(!burgerMenu.isOpen))}
                        onKeyPress={() => dispatch(toggleMenu(!burgerMenu.isOpen))}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                <span className="hidden-sm-down mr-3">
                    <Languages onChangeLanguage={lang => dispatch(setAppLocale(lang))} />
                </span>
                <p id="main-header-title-dom" className="navbar-text mr-auto" />
                <div id="main-header-side-action-dom" />
            </div>
        </nav>
    </header>
);

MainHeader.propTypes = {
    burgerMenu: PropTypes.shape({
        isOpen: PropTypes.bool.required,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'component', 'form', 'route'])(connect(
    state => ({ authentication: state.authentication, burgerMenu: state.burgerMenu }),
    dispatch => ({ dispatch }),
)(MainHeader));
