import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { action as toggleMenu } from 'redux-burger-menu';

import './MainHeader.scss';
import SignInForm from '../Authentication/SignInForm';
import Languages from '../Languages';

class MainHeader extends React.Component {
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
                    <p id="main-header-title-dom" className="navbar-text mr-auto" />
                    <div id="main-header-side-action-dom" />
                </nav>
            </header>
        );
    }
}

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
