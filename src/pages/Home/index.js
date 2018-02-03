import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';

import { routes } from '../../helpers/routes';
import { signOut } from '../../actions/authentication';

import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import SignInForm from '../../components/Authentication/SignInForm';
import Landing from './Landing';
import Content from './Content';

class Home extends React.Component {
    renderSignInButton() {
        const { credentials, dispatch, t } = this.props;
        const { token } = credentials;

        if (token) {
            return (
                <button type="button" className="btn btn-outline-light" onClick={() => dispatch(signOut())}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> {t('form:signIn.button.signOut')}
                </button>
            );
        }

        return (
            <button
                type="button"
                className="btn btn-outline-light"
                data-toggle="modal"
                data-target="#modal-home-login"
            >
                <FontAwesomeIcon icon={faSignInAlt} /> {t('form:signIn.button.default')}
            </button>
        );
    }

    render() {
        const { history, t } = this.props;
        return (
            <div id="home">
                <Title>{t('page:Home.Landing.subtitle')}</Title>
                <SideAction><div className="mx-2 mx-sm-3">{this.renderSignInButton()}</div></SideAction>
                <div
                    className="modal animated slideInDown"
                    id="modal-home-login"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={t('form:signIn.labelledBy')}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FontAwesomeIcon icon={faUserCircle} />&nbsp;
                                    {t('page:Home.modal-login.title')}
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
                                <SignInForm scope={routes.home} />
                            </div>
                        </div>
                    </div>
                </div>
                <Landing />
                <Content history={history} />
            </div>
        );
    }
}

Home.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string,
        token: PropTypes.string,
        profile: PropTypes.object,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'form', 'page', 'route'])(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(Home));
