import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { translate } from 'react-i18next';

import { getEndpoint, headers } from '../../helpers/endpoint';
import { requestSignIn, successSignIn, failSignIn, signOut, fetchProfileIfNeeded } from '../../actions/authentication';

import './MainHeader.css';
import SignInForm from '../Authentication/SignInForm';

const $ = window.$;

class MainHeader extends React.Component {
    signIn(values) {
        const { dispatch } = this.props;

        dispatch(requestSignIn());
        return fetch(getEndpoint('signIn'), {
            method: 'POST',
            headers,
            body: JSON.stringify(values)
        })
            .then(response => response.json()).then(data => {
                if(data.error) {
                    dispatch(failSignIn());
                    throw new SubmissionError({ _error: data.error });
                } else {
                    dispatch(successSignIn(data.token, data.userId));
                    dispatch(fetchProfileIfNeeded());
                    $('#modal-mainHeader-login').modal('hide');
                }
            });
    }

    renderSignInButton() {
        const { authentication, dispatch, t } = this.props;
        const { isAuthenticated, isLoaded, user } = authentication;

        if (!isAuthenticated) {
            return (
                <button
                    type="button" className="btn btn-outline-primary"
                    data-toggle="modal" data-target="#modal-mainHeader-login"
                >
                    <i className="fa fa-sign-in"/> {t('form:signIn.button.default')}
                </button>
            );
        }
        else if (!isLoaded) {
            return (
                <button type="button" className="btn btn-outline-primary" disabled={true}>
                    <i className="fa fa-spinner fa-spin"/> {t('form:signIn.state.isFetching')}
                </button>
            );
        }
        else if (user) {
            return (
                <button type="button" className="btn btn-outline-default" onClick={() => dispatch(signOut())}>
                    {t('form:signIn.button.signOut')}
                </button>

            );
        }
    }

    getLanguageItemClass(locale) {
        const { i18n } = this.props;
        return i18n.language === locale ? 'hidden' : 'visible';
    }

    render() {
        const { i18n, t } = this.props;

        // TODO: maybe create a converting table between i18n locales and flag-icons
        // en -> gb is the only case so far
        const localeToFlag = i18n.language === 'en' ? 'gb' : i18n.language;

        return (
            <header id="main-header">
                <div
                    className="modal fade"
                    id="modal-mainHeader-login"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={t('form:signIn.labelledBy')}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fa fa-user-circle-o"/> {t('component:MainHeader.modal-login.title')}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label={t('accessibility.aria-label.close')}
                                > <span >&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <SignInForm onSubmit={this.signIn.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light bg-russia-light">
                    <div className="container">
                        <a  href="/" className="navbar-brand">{t('project.name')}</a>
                        <button
                            className="navbar-toggler" type="button"
                            data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label={t('accessibility.aria-label.toggleNav')}
                        >
                            <i className="fa fa-bars"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">
                                        {t('route:home.text')}&nbsp;
                                        <span className="sr-only">{t('accessibility.sr-only.current')}</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">{t('route:inventory.text')}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">{t('route:games.text')}</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#" id="navbarLanguageDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span className={`flag-icon flag-icon-${localeToFlag}`}/>
                                    </a>
                                    <div
                                        className="dropdown-menu" htmlFor="navbarLanguageDropdown"
                                        aria-labelledby={t('component:MainHeader.navbarLanguageDropdown.labelledBy')}
                                    >
                                        <a className="dropdown-item" href="#">
                                            <span className={`flag-icon flag-icon-${localeToFlag}`}/>
                                            {t(`language.${i18n.language}`)}
                                        </a>
                                        <div className="dropdown-divider"/>
                                        <a
                                            className={`dropdown-item ${this.getLanguageItemClass('en')}`}
                                            href="#" onClick={() => i18n.changeLanguage('en')}
                                        >
                                            <span className="flag-icon flag-icon-gb"/>
                                            {t('language.en')}
                                        </a>
                                        <a
                                            className={`dropdown-item ${this.getLanguageItemClass('fr')}`}
                                            href="#" onClick={() => i18n.changeLanguage('fr')}
                                        >
                                            <span className="flag-icon flag-icon-fr"/>
                                            {t('language.fr')}
                                        </a>
                                        <a
                                            className={`dropdown-item ${this.getLanguageItemClass('es')}`}
                                            href="#" onClick={() => i18n.changeLanguage('es')}
                                        >
                                            <span className="flag-icon flag-icon-es"/>
                                            {t('language.es')}
                                        </a>
                                        <a
                                            className={`dropdown-item ${this.getLanguageItemClass('de')}`}
                                            href="#" onClick={() => i18n.changeLanguage('de')}
                                        >
                                            <span className="flag-icon flag-icon-de"/>
                                            {t('language.de')}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            {this.renderSignInButton()}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

MainHeader.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default translate(['common', 'component', 'form', 'route'])(connect(
    state => ({ authentication: state.authentication }),
    dispatch => ({ dispatch })
)(MainHeader));
