import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { action as toggleMenu } from 'redux-burger-menu';

import { getEndpoint, headers } from '../../helpers/endpoint';
import { requestSignIn, successSignIn, failSignIn, signOut, fetchProfileIfNeeded } from '../../actions/authentication';

import './MainHeader.scss';
import SignInForm from '../Authentication/SignInForm';
import Languages from './Languages';

const { $ } = window;

class MainHeader extends React.Component {
    signIn(values) {
        const { dispatch } = this.props;

        dispatch(requestSignIn());
        return fetch(getEndpoint('signIn'), {
            method: 'POST',
            headers,
            body: JSON.stringify(values),
        })
            .then(response => response.json()).then((data) => {
                if (data.error) {
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
        const { isAuthenticated, isLoaded, userId } = authentication;

        if (isAuthenticated) {
            if (!isLoaded) {
                return (
                    <button type="button" className="btn btn-outline-primary" disabled>
                        <i className="fa fa-spinner fa-spin" /> {t('form:signIn.state.isFetching')}
                    </button>
                );
            } else if (userId) {
                return (
                    <button type="button" className="btn btn-outline-default" onClick={() => dispatch(signOut())}>
                        {t('form:signIn.button.signOut')}
                    </button>

                );
            }
        }

        return (
            <button
                type="button"
                className="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#modal-mainHeader-login"
            >
                <i className="fa fa-sign-in" /> {t('form:signIn.button.default')}
            </button>
        );
    }

    render() {
        const { burgerMenu, dispatch, t } = this.props;

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
                                    <i className="fa fa-user-circle-o" /> {t('component:MainHeader.modal-login.title')}
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
                                <SignInForm onSubmit={() => this.signIn()} />
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-dark">
                    <a href="/" className="navbar-brand mb-0 h1 hidden-sm-down">{t('project.name')}</a>
                    <div className="btn-drawer my-2 ml-2 ml-sm-0 mr-2 mr-sm-3">
                        <button
                            className="btn"
                            type="button"
                            aria-expanded="false"
                            aria-label={t('accessibility.aria-label.toggleNav')}
                            onClick={() => dispatch(toggleMenu(!burgerMenu.isOpen))}
                            onKeyPress={() => dispatch(toggleMenu(!burgerMenu.isOpen))}
                        >
                            <i className="fa fa-bars" />
                        </button>
                    </div>
                    <span className="hidden-sm-down mr-3"><Languages /></span>
                    <p className="navbar-text mx-auto">Je suis un text qui se veut être très long pour des tests</p>
                    <div className="dropdown mx-0 mx-sm-1 mr-1 mr-sm-2">
                        <button
                            type="button"
                            id="navbarEllipsisDropdown"
                            className="btn"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-ellipsis-v" />
                        </button>
                        <div
                            htmlFor="navbarEllipsisDropdown"
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby={t('component:MainHeader.navbarEllipsisDropdown.labelledBy')}
                        >
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

MainHeader.propTypes = {
    authentication: PropTypes.shape({
        isAuthenticated: PropTypes.bool,
        isLoaded: PropTypes.bool,
        userId: PropTypes.string,
    }).isRequired,
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
